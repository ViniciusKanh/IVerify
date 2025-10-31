# 💳 IVerify — Análise de Crédito Inteligente

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Backend-FastAPI-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Model-XGBoost-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Online-success?style=for-the-badge" />
</p>

<p align="center">
  <b>IVerify</b> é uma solução completa de <b>análise de risco de crédito com IA</b>, 
  baseada no dataset <a href="https://archive.ics.uci.edu/dataset/144/statlog+german+credit+data" target="_blank">Statlog German Credit</a>, 
  com interface web interativa e integração a um backend em FastAPI hospedado no Hugging Face Spaces.
</p>

---

## ✨ Visão Geral

O **IVerify** oferece uma abordagem moderna para **avaliação automatizada de crédito**, combinando **machine learning (XGBoost)** com uma interface de simulação leve e responsiva em **HTML, CSS e JavaScript puro**.

Com ele, é possível simular solicitações de crédito, visualizar o risco de inadimplência e obter feedbacks interpretáveis em tempo real — ideal para demonstrações de modelos preditivos e sistemas de decisão financeira.
 
---

## ⚙️ Funcionalidades Principais

✅ **Análise de Crédito Interativa:** formulário completo com 20 atributos financeiros e pessoais.  
✅ **Interface Moderna:** tema escuro/claro, feedback visual e animações suaves.  
✅ **Integração com API FastAPI:** realiza predição via endpoint `/predict`.  
✅ **Visualização de Confiança:** anel dinâmico mostra a probabilidade de aprovação.  
✅ **Detalhes Técnicos:** exibe o JSON bruto retornado pela API.  
✅ **Modo Demonstração:** botão para carregar um exemplo pré-preenchido.  

---

## 🧮 Modelo de Machine Learning

O modelo de base é um **XGBoost Classifier binário**, treinado sobre o *German Credit Data (UCI ML Repository)*.

| Métrica                | Valor Aproximado |
|-------------------------|------------------|
| Acurácia               | ~75% |
| Precisão (Classe Positiva) | 0.77 |
| Recall (Classe Positiva) | 0.74 |
| AUC                    | 0.81 |
| Threshold ótimo (custo-sensível) | 0.42 |

### 🧩 Atributos de Entrada (20)

Os principais atributos são:
- Status da conta corrente (`checking_status`)  
- Duração do crédito (`credit_duration_months`)  
- Histórico de crédito (`credit_history`)  
- Propósito do empréstimo (`loan_purpose`)  
- Valor do crédito (`credit_amount`)  
- Conta poupança/títulos (`savings_account`)  
- Tempo de emprego (`employment_duration`)  
- Taxa de prestação (`installment_rate`)  
- Status pessoal e sexo (`personal_status_sex`)  
- Tipo de moradia, fiador, idade, e mais…

📘 Veja todos os atributos e valores possíveis em [`attribute_mapping.js`](./attribute_mapping.js).

---

## 🧰 Stack Tecnológica

| Camada | Tecnologia |
|--------|-------------|
| **Frontend** | HTML5, CSS3, Vanilla JS |
| **Backend API** | Python 3.10 + FastAPI |
| **Modelo ML** | XGBoost, scikit-learn, joblib |
| **Hospedagem** | Hugging Face Spaces |
| **Dataset** | Statlog German Credit (UCI) |

---

## 🚀 Como Executar Localmente

### 1️⃣ Clonar o projeto
```bash
git clone https://github.com/ViniciusKanh/IVerify.git
cd IVerify
```

### 2️⃣ Executar o Frontend
Basta abrir o arquivo `index.html` no navegador.

> 💡 Dica: para evitar problemas de CORS, hospede o backend localmente ou use o endpoint público do Hugging Face.

### 3️⃣ Configurar a URL da API
No campo “Base URL da API” da interface, insira:
```
https://viniciuskhan-backend-iverify.hf.space
```

---

## 🌐 Endpoints Principais da API

| Método | Endpoint | Descrição |
|--------|-----------|-----------|
| `GET` | `/health` | Verifica status do modelo |
| `GET` | `/schema` | Retorna esquema de atributos esperados |
| `GET` | `/sample` | Fornece payload de exemplo |
| `POST` | `/predict` | Retorna predição para 1 cliente |
| `POST` | `/predict_batch` | Retorna predições em lote |

### Exemplo de Requisição
```bash
curl -X POST "https://viniciuskhan-backend-iverify.hf.space/predict"      -H "Content-Type: application/json"      -d @example_payload.json
```

### Exemplo de Resposta
```json
{
  "approved": 1,
  "prob_approved": 0.78,
  "feature_importance": "Crédito curto e bom histórico foram determinantes.",
  "input_data": { "checking_status": "A12", "credit_duration_months": 24, ... }
}
```

---

## 🧾 Estrutura de Pastas

```
IVerify/
│
├── index.html
├── app.js
├── attribute_mapping.js
├── styles.css
├── README.md
└── .gitignore
```

---

## 👨‍💻 Autor

**Vinicius de Souza Santos**  
📧 [vinicius-souza.santos@unesp.br](mailto:vinicius-souza.santos@unesp.br)  
🔗 [github.com/ViniciusKanh](https://github.com/ViniciusKanh)  
🎓 UNESP | IFSP | Penso Tecnologia  

> “Construindo soluções orientadas a dados e IA explicável.”

---

## 🪪 Licença

Este projeto é distribuído sob a licença **MIT**.  
Sinta-se livre para usar, modificar e compartilhar.

---

<p align="center">
  <sub>Feito com 💚 por Vinicius de Souza Santos — <b>IVerify</b> © 2025</sub>
</p>
