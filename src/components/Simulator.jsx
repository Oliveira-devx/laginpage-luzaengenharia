import {
  Calculator,
  CircleDollarSign,
  Zap,
  TrendingDown,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import ScrollReveal from "./ScrollReveal";

const INITIAL_VALUES = {
  bill: "",
  consumption: "",
};

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function Simulator() {
  const [values, setValues] = useState(INITIAL_VALUES);

  const [hasCalculated, setHasCalculated] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const sanitizedValue = value.replace(
      /[^0-9.,]/g,
      ""
    );

    setValues((current) => ({
      ...current,
      [name]: sanitizedValue,
    }));

    setHasCalculated(false);
  };

  const parseNumber = (value) => {
    if (!value) {
      return 0;
    }

    const normalized = value
      .replace(/\./g, "")
      .replace(",", ".");

    return Number(normalized) || 0;
  };

  const result = useMemo(() => {
    const bill = parseNumber(values.bill);

    const consumption = parseNumber(
      values.consumption
    );

    if (bill <= 0) {
      return null;
    }

    /*
      Estimativa inicial de economia de 70%.

      Ou seja:
      - 70% da conta é considerada como economia;
      - 30% permanece como valor estimado da conta.

      O resultado é apenas uma estimativa inicial
      e não substitui um dimensionamento técnico.
    */

    const estimatedSolarBill = bill * 0.30;

    const monthlySavings =
      bill - estimatedSolarBill;

    const annualSavings =
      monthlySavings * 12;

    return {
      bill,
      consumption,
      estimatedSolarBill,
      monthlySavings,
      annualSavings,
    };
  }, [values]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const bill = parseNumber(values.bill);

    if (bill <= 0) {
      setHasCalculated(false);
      return;
    }

    setHasCalculated(true);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setHasCalculated(false);
  };

  return (
    <section
      className="section simulator"
      id="simulador"
    >
      <div className="container">

        <ScrollReveal>
          <div className="simulator-heading">

            <span className="eyebrow">
              SIMULE SEU SISTEMA
            </span>

            <h2>
              QUANTO VOCÊ PODE
              <span> ECONOMIZAR?</span>
            </h2>

            <p>
              Informe alguns dados da sua conta de
              energia e tenha uma estimativa inicial
              do potencial de economia.
            </p>

          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="simulator-wrapper">

            {/* FORMULÁRIO */}
            <div className="simulator-form-area">

              <div className="simulator-form-header">

                <div className="simulator-form-icon">
                  <Calculator size={22} />
                </div>

                <div>
                  <span>
                    SIMULAÇÃO RÁPIDA
                  </span>

                  <h3>
                    Conte um pouco sobre seu consumo
                  </h3>
                </div>

              </div>

              <form
                className="simulator-form"
                onSubmit={handleSubmit}
              >

                <div className="form-field">

                  <label htmlFor="bill">
                    Valor médio da sua conta
                  </label>

                  <div className="input-wrapper">

                    <span className="input-prefix">
                      R$
                    </span>

                    <input
                      id="bill"
                      name="bill"
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex.: 650"
                      value={values.bill}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="form-field">

                  <label htmlFor="consumption">
                    Consumo médio mensal
                  </label>

                  <div className="input-wrapper">

                    <input
                      id="consumption"
                      name="consumption"
                      type="text"
                      inputMode="decimal"
                      placeholder="Ex.: 500"
                      value={values.consumption}
                      onChange={handleChange}
                    />

                    <span className="input-suffix">
                      kWh
                    </span>

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-primary simulator-button"
                >
                  <Calculator size={18} />

                  <span>
                    CALCULAR MINHA ECONOMIA
                  </span>

                  <ArrowRight size={18} />
                </button>

                {hasCalculated && (
                  <motion.button
                    type="button"
                    className="simulator-reset"
                    onClick={handleReset}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  >
                    <RotateCcw size={15} />

                    <span>
                      Fazer nova simulação
                    </span>

                  </motion.button>
                )}

              </form>

              <div className="simulator-disclaimer">

                <span>i</span>

                <p>
                  Esta é uma estimativa inicial.
                  O resultado real depende do consumo,
                  tarifa, localização, cobrança mínima,
                  disponibilidade e dimensionamento
                  técnico do sistema.
                </p>

              </div>

            </div>

            {/* RESULTADO */}
            <div className="simulator-result-area">

              {!hasCalculated || !result ? (

                <div className="simulator-empty">

                  <div className="simulator-empty-icon">
                    <Zap size={30} />
                  </div>

                  <span>
                    SUA ESTIMATIVA APARECERÁ AQUI
                  </span>

                  <p>
                    Preencha o valor da sua conta para
                    visualizar uma projeção inicial.
                  </p>

                </div>

              ) : (

                <motion.div
                  className="simulator-result"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >

                  <div className="simulator-result-top">

                    <div>

                      <span className="eyebrow">
                        ESTIMATIVA INICIAL
                      </span>

                      <h3>
                        Seu potencial de economia
                      </h3>

                    </div>

                    <div className="simulator-result-icon">
                      <TrendingDown size={22} />
                    </div>

                  </div>

                  <div className="simulator-main-result">

                    <span>
                      ECONOMIA ESTIMADA POR MÊS
                    </span>

                    <strong>
                      {formatCurrency(
                        result.monthlySavings
                      )}
                    </strong>

                  </div>

                  <div className="simulator-result-grid">

                    <div className="simulator-result-card">

                      <CircleDollarSign size={18} />

                      <span>
                        Conta atual
                      </span>

                      <strong>
                        {formatCurrency(
                          result.bill
                        )}
                      </strong>

                    </div>

                    <div className="simulator-result-card">

                      <Zap size={18} />

                      <span>
                        Conta estimada
                      </span>

                      <strong>
                        {formatCurrency(
                          result.estimatedSolarBill
                        )}
                      </strong>

                    </div>

                    <div className="simulator-result-card simulator-result-card-wide">

                      <TrendingDown size={18} />

                      <span>
                        Economia estimada no ano
                      </span>

                      <strong>
                        {formatCurrency(
                          result.annualSavings
                        )}
                      </strong>

                    </div>

                  </div>

                  {result.consumption > 0 && (

                    <div className="simulator-consumption">

                      <span>
                        Consumo informado
                      </span>

                      <strong>
                        {result.consumption.toLocaleString(
                          "pt-BR"
                        )}{" "}
                        kWh/mês
                      </strong>

                    </div>

                  )}

                  <a
                    href="#contato"
                    className="simulator-result-cta"
                  >
                    <span>
                      Quero uma análise personalizada
                    </span>

                    <ArrowRight size={18} />
                  </a>

                </motion.div>

              )}

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}