const ATTRIBUTE_MAPPING = {
    "checking_status": {
        "label": "Status da Conta Corrente",
        "type": "categorical",
        "options": {
            "A11": "< 0 DM",
            "A12": "0 <= ... < 200 DM",
            "A13": ">= 200 DM / salário por 1 ano",
            "A14": "Sem conta corrente"
        }
    },
    "credit_duration_months": {
        "label": "Duração do Crédito (meses)",
        "type": "numerical",
        "min": 4,
        "max": 72,
        "default": 24
    },
    "credit_history": {
        "label": "Histórico de Crédito",
        "type": "categorical",
        "options": {
            "A30": "Sem crédito / Todos pagos devidamente",
            "A31": "Todos créditos neste banco pagos devidamente",
            "A32": "Créditos existentes pagos devidamente",
            "A33": "Atrasos em pagamentos passados",
            "A34": "Conta crítica / Outros créditos existentes"
        }
    },
    "loan_purpose": {
        "label": "Propósito do Empréstimo",
        "type": "categorical",
        "options": {
            "A40": "Carro (novo)",
            "A41": "Carro (usado)",
            "A42": "Móveis/Equipamentos",
            "A43": "Rádio/Televisão",
            "A44": "Eletrodomésticos",
            "A45": "Reparos",
            "A46": "Educação",
            "A48": "Retreinamento",
            "A49": "Negócios",
            "A410": "Outros"
        }
    },
    "credit_amount": {
        "label": "Valor do Crédito (DM)",
        "type": "numerical",
        "min": 250,
        "max": 18424,
        "default": 3500
    },
    "savings_account": {
        "label": "Conta Poupança/Títulos",
        "type": "categorical",
        "options": {
            "A61": "< 100 DM",
            "A62": "100 <= ... < 500 DM",
            "A63": "500 <= ... < 1000 DM",
            "A64": ">= 1000 DM",
            "A65": "Desconhecido / Sem conta poupança"
        }
    },
    "employment_duration": {
        "label": "Empregado Desde",
        "type": "categorical",
        "options": {
            "A71": "Desempregado",
            "A72": "< 1 ano",
            "A73": "1 <= ... < 4 anos",
            "A74": "4 <= ... < 7 anos",
            "A75": ">= 7 anos"
        }
    },
    "installment_rate": {
        "label": "Taxa de Prestação (% da Renda)",
        "type": "numerical",
        "min": 1,
        "max": 4,
        "default": 3
    },
    "personal_status_sex": {
        "label": "Status Pessoal e Sexo",
        "type": "categorical",
        "options": {
            "A91": "Masculino: Divorciado/Separado",
            "A92": "Feminino: Divorciada/Separada/Casada",
            "A93": "Masculino: Solteiro",
            "A94": "Masculino: Casado/Viúvo",
            "A95": "Feminino: Solteira"
        }
    },
    "guarantors": {
        "label": "Outros Devedores / Fiadores",
        "type": "categorical",
        "options": {
            "A101": "Nenhum",
            "A102": "Co-aplicante",
            "A103": "Fiador"
        }
    },
    "residence_since": {
        "label": "Residente Desde (anos)",
        "type": "numerical",
        "min": 1,
        "max": 4,
        "default": 2
    },
    "property_type": {
        "label": "Tipo de Propriedade",
        "type": "categorical",
        "options": {
            "A121": "Imóvel",
            "A122": "Acordo de Poupança/Seguro de Vida",
            "A123": "Carro ou Outro",
            "A124": "Desconhecido / Sem propriedade"
        }
    },
    "age_years": {
        "label": "Idade (anos)",
        "type": "numerical",
        "min": 19,
        "max": 75,
        "default": 35
    },
    "other_installment_plans": {
        "label": "Outros Planos de Prestação",
        "type": "categorical",
        "options": {
            "A141": "Banco",
            "A142": "Lojas",
            "A143": "Nenhum"
        }
    },
    "housing_type": {
        "label": "Tipo de Moradia",
        "type": "categorical",
        "options": {
            "A151": "Aluguel",
            "A152": "Própria",
            "A153": "Gratuita"
        }
    },
    "existing_credits": {
        "label": "Créditos Existentes Neste Banco",
        "type": "numerical",
        "min": 1,
        "max": 4,
        "default": 1
    },
    "job_type": {
        "label": "Tipo de Emprego",
        "type": "categorical",
        "options": {
            "A171": "Desempregado/Não qualificado - não residente",
            "A172": "Não qualificado - residente",
            "A173": "Empregado qualificado / Oficial",
            "A174": "Gerência/Autônomo/Altamente qualificado/Oficial"
        }
    },
    "dependents": {
        "label": "Dependentes",
        "type": "numerical",
        "min": 1,
        "max": 2,
        "default": 1
    },
    "telephone": {
        "label": "Telefone",
        "type": "categorical",
        "options": {
            "A191": "Nenhum",
            "A192": "Sim (registrado no nome do cliente)"
        }
    },
    "foreign_worker": {
        "label": "Trabalhador Estrangeiro",
        "type": "categorical",
        "options": {
            "A201": "Sim",
            "A202": "Não"
        }
    }
};

const API_EXAMPLE_PAYLOAD = {
    "checking_status":"A12",
    "credit_duration_months":24,
    "credit_history":"A32",
    "loan_purpose":"A43",
    "credit_amount":3500,
    "savings_account":"A61",
    "employment_duration":"A73",
    "installment_rate":3,
    "personal_status_sex":"A93",
    "guarantors":"A101",
    "residence_since":2,
    "property_type":"A121",
    "age_years":35,
    "other_installment_plans":"A143",
    "housing_type":"A152",
    "existing_credits":1,
    "job_type":"A173",
    "dependents":1,
    "telephone":"A192",
    "foreign_worker":"A202"
};
