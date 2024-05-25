import { z } from "zod";

const fazendaPost = z.object({
  body: z.object({
    nome: z.string({
      required_error: "O nome é obrigatório",
      invalid_type_error: "O nome deve ser um texto",
    }),
    unidadeGeradora: z.string({
      required_error: "A unidade geradora é obrigatória",
      invalid_type_error: "A unidade geradora deve ser um texto",
    }),
    numeroInstalacao: z.string({
      required_error: "O número de instalação é obrigatório",
      invalid_type_error: "O número de instalação deve ser um texto",
    }),
    numeroCliente: z.string({
      required_error: "O número do cliente é obrigatório",
      invalid_type_error: "O número do cliente deve ser um texto",
    }),
    notaServico: z.string({
      required_error: "A nota de serviço é obrigatória",
      invalid_type_error: "A nota de serviço deve ser um texto",
    }),
    potenciaInstalada: z.number({
      required_error: "A potência instalada é obrigatória",
      invalid_type_error: "A potência instalada deve ser um número",
    }),
    dataConexao: z.string().refine(
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
          "A data de conexão deve ser uma data válida no formato 'YYYY-MM-DD'",
      }
    ),
    tipoDesvioCota: z.string({
      required_error: "O tipo de desvio de cota é obrigatório",
      invalid_type_error: "O tipo de desvio de cota deve ser um texto",
    }),
    limiteDesvioCota: z.number({
      required_error: "O limite de desvio de cota é obrigatório",
      invalid_type_error: "O limite de desvio de cota deve ser um número",
    }),
    fonteEnergia: z.string({
      required_error: "A fonte de energia é obrigatória",
      invalid_type_error: "A fonte de energia deve ser um texto",
    }),
  }),
  params: z.object({
    concessionaria: z.string({
      required_error: "O nome da fazenda é obrigatório",
      invalid_type_error: "O nome da fazenda deve ser um texto",
    }),
  }),
});

const fazendaPut = fazendaPost.extend({
  params: z.object({
    id: z.string({
      required_error: "O id é obrigatório",
      invalid_type_error: "O id deve ser um texto",
    }),
  }),
});

export { fazendaPost, fazendaPut };
