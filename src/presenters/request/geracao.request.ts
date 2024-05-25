/*
referencia: Date;
  fazenda: FazendaPropsId;
  dataLeitura: Date;
  demandaKwH: number;
  tarifaDemanda: number;
  energiaInjetadaHFP: number;
  autoConsumoHFP: number;
  saldoGeracaoHFP: number;
  energiaInjetadaHP: number;
  autoConsumoHP: number;
  saldoGeracaoHP: number;
*/

import { z } from "zod";

const geracaoPost = z.object({
  body: z.object({
    referencia: z
      .string({
        required_error: "A referência é obrigatória",
        invalid_type_error: "A referência deve ser um texto",
      })
      .refine(
        (data) => {
          const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

          if (!dateFormatRegex.test(data)) {
            return false;
          }

          const date = new Date(data);
          return date instanceof Date && !isNaN(date.getTime());
        },
        {
          message:
            "A data de referência deve ser uma data válida no formato 'YYYY-MM-DD'",
        }
      ),
    dataLeitura: z
      .string({
        required_error: "A data de leitura é obrigatória",
        invalid_type_error: "A data de leitura deve ser um texto",
      })
      .refine(
        (data) => {
          const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

          if (!dateFormatRegex.test(data)) {
            return false;
          }

          const date = new Date(data);
          return date instanceof Date && !isNaN(date.getTime());
        },
        {
          message:
            "A data de leitura deve ser uma data válida no formato 'YYYY-MM-DD'",
        }
      ),
    demandaKwH: z.number({
      required_error: "A demanda em kWh é obrigatória",
      invalid_type_error: "A demanda em kWh deve ser um número",
    }),
    tarifaDemanda: z.number({
      required_error: "A tarifa de demanda é obrigatória",
      invalid_type_error: "A tarifa de demanda deve ser um número",
    }),
    energiaInjetadaHFP: z.number({
      required_error: "A energia injetada em HFP é obrigatória",
      invalid_type_error: "A energia injetada em HFP deve ser um número",
    }),
    autoConsumoHFP: z.number({
      required_error: "O autoconsumo em HFP é obrigatório",
      invalid_type_error: "O autoconsumo em HFP deve ser um número",
    }),
    saldoGeracaoHFP: z.number({
      required_error: "O saldo de geração em HFP é obrigatório",
      invalid_type_error: "O saldo de geração em HFP deve ser um número",
    }),
    energiaInjetadaHP: z.number({
      required_error: "A energia injetada em HP é obrigatória",
      invalid_type_error: "A energia injetada em HP deve ser um número",
    }),
    autoConsumoHP: z.number({
      required_error: "O autoconsumo em HP é obrigatório",
      invalid_type_error: "O autoconsumo em HP deve ser um número",
    }),
    saldoGeracaoHP: z.number({
      required_error: "O saldo de geração em HP é obrigatório",
      invalid_type_error: "O saldo de geração em HP deve ser um número",
    }),
  }),
  params: z.object({
    fazenda: z.string({
      required_error: "O nome da fazenda é obrigatório",
      invalid_type_error: "O nome da fazenda deve ser um texto",
    }),
  }),
});

const geracaoPut = z.object({
  params: z.object({
    id: z.string({
      required_error: "O ID é obrigatório",
      invalid_type_error: "O ID deve ser um texto",
    }),
  }),
});

export { geracaoPost, geracaoPut };
