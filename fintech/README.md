# 💰 FinTech - Sistema de Controle de Capital de Giro

Sistema completo de gestão financeira para pequenos negócios de revenda, focado em **evitar ficar sem capital de giro**.

## 🎯 Objetivo Principal

Controlar entradas, saídas e reservas com visão clara do capital disponível, garantindo que você:
- ✅ Nunca fique sem capital de giro
- ✅ Separe automaticamente 10% de reserva (metodologia "O Homem Mais Rico da Babilônia")
- ✅ Pague todas as contas no prazo (principalmente dia 8)
- ✅ Tome decisões baseadas em dados reais

---

## 🚀 Como Acessar

**URL em produção:**
```
https://www.romulomonte.com/fintech
```

---

## 📊 Funcionalidades

### 1️⃣ ENTRADAS (RECEITAS)
- Registre vendas de mercadorias, serviços e outros
- **10% vai automaticamente para Reserva**
- **90% entra como capital disponível**
- Visualize totais por período: semanal, mensal, semestral, anual

### 2️⃣ DESPESAS FIXAS MENSAIS
Pré-cadastradas:
- 🚗 Carro: R$ 1.650 (vencimento dia 8)
- 🌐 Internet: R$ 110 (vencimento dia 5)
- ⚡ Energia: R$ 300 (vencimento dia 20)
- 💧 Água: R$ 80 (vencimento dia 20)
- 🍽️ Alimentação: R$ 800 (vencimento dia 15)

Funcionalidades:
- Marcar como pago/não pago
- Editar valores
- Alertas 3 dias antes do vencimento

### 3️⃣ DESPESAS VARIÁVEIS
Registre:
- ⛽ Combustível (destaque visual especial)
- 🚚 Frete
- 🔧 Manutenção
- 💳 Empréstimos
- 📦 Outros

### 4️⃣ CAPITAL DE GIRO (Painel Central)
Visualize em tempo real:
- 💰 Capital disponível
- 🏦 Reserva acumulada (10%)
- 📊 Total comprometido com contas
- 💹 Saldo projetado após pagar tudo

**ALERTA VERMELHO:**
- Dispara quando saldo projetado < R$ 1.000
- Mensagem clara: "🚨 RISCO DE FICAR SEM CAPITAL DE GIRO"

### 5️⃣ SIMULAÇÕES
#### 🔮 Projeção até dia 8
- Calcula quanto você precisa faturar até dia 8
- Considera margem de segurança de R$ 1.000

#### 💰 Simulação de Compra
- Simule o impacto de comprar mercadoria
- Verifica se ficará com capital suficiente

#### ⏰ Simulação de Atraso
- Simule o impacto de receber uma venda atrasada
- Alerta se ficará sem capital para pagar contas

---

## 🎨 Sistema de Cores

- 🟢 **Verde**: Situação saudável
- 🟡 **Amarelo**: Atenção necessária
- 🔴 **Vermelho**: Risco crítico

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5 + CSS3 + JavaScript puro (vanilla)
- **Backend**: Vercel Serverless Functions (Node.js)
- **Hospedagem**: Vercel
- **Persistência**: API REST com armazenamento em memória

---

## 📁 Estrutura do Projeto

```
fintech/
├── index.html          # Página principal (HTML + CSS + JS integrados)
└── README.md          # Este arquivo

api/
└── fintech/
    └── data.js        # API backend (Vercel Function)
```

---

## 🔧 Como Funciona

### 1. Adicionar Entrada
```
Valor total: R$ 1.000
↓
Reserva (10%): R$ 100 → Vai para "Reserva Acumulada" (NÃO pode ser usado)
Capital (90%): R$ 900 → Vai para "Capital Disponível" (pode usar)
```

### 2. Pagar Despesa Fixa
```
Marcar "Carro" como pago
↓
Capital disponível: R$ 900 - R$ 1.650 = -R$ 750 (ALERTA VERMELHO!)
```

### 3. Simulação Dia 8
```
Capital atual: R$ 500
Despesas até dia 8: R$ 1.650 (Carro)
↓
Falta: R$ 1.150
Com margem: R$ 2.150 (incluindo R$ 1.000 de segurança)
```

---

## ⚠️ Regras Importantes

1. **Reserva de 10% é INTOCÁVEL**
   - Não pode ser usada para pagar despesas
   - Serve como fundo de emergência

2. **Margem de Segurança: R$ 1.000**
   - Sempre mantenha pelo menos R$ 1.000 após pagar todas as contas
   - Sistema alerta quando está abaixo desse valor

3. **Dia 8 é CRÍTICO**
   - Principal vencimento (Carro - R$ 1.650)
   - Planeje para ter capital suficiente

4. **Combustível merece atenção**
   - Custo recorrente e variável
   - Destaque visual amarelo nas tabelas

---

## 🔄 Fluxo de Uso Recomendado

### Diariamente:
1. ✅ Registrar todas as vendas do dia
2. ✅ Registrar despesas variáveis (combustível, frete)
3. ✅ Verificar painel de capital de giro

### Semanalmente:
1. ✅ Analisar receitas semanais
2. ✅ Verificar combustível total da semana
3. ✅ Simular compras de mercadoria

### Mensalmente:
1. ✅ Usar simulação "Dia 8" na primeira semana
2. ✅ Marcar despesas fixas como pagas
3. ✅ Analisar totais mensais
4. ✅ Resetar status das despesas fixas no início do mês

---

## 📱 Responsividade

Sistema totalmente responsivo:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

---

## 🚀 Deploy no Vercel

O projeto já está configurado para deploy automático:

```bash
git add .
git commit -m "feat: adicionar sistema fintech"
git push
```

Vercel irá:
1. Detectar mudanças
2. Fazer build automático
3. Publicar em `https://www.romulomonte.com/fintech`

---

## 🔐 Segurança dos Dados

**⚠️ IMPORTANTE:**
- Dados ficam armazenados em **memória no servidor**
- Em ambiente de produção, dados são **voláteis** (podem ser perdidos em restart)
- Para persistência permanente, recomenda-se integrar com:
  - MongoDB Atlas (gratuito)
  - PostgreSQL (Vercel Postgres)
  - Supabase
  - Firebase

---

## 🎓 Conceitos Aplicados

### Metodologia: "O Homem Mais Rico da Babilônia"
- Separe 10% de tudo que ganhar
- Nunca toque nessa reserva
- Use para emergências ou investimentos futuros

### Gestão de Capital de Giro
- Capital de giro = Capital disponível - Contas a pagar
- Sempre mantenha margem de segurança
- Nunca opere com capital negativo

---

## 🔮 Próximas Melhorias (Sugestões)

1. **Persistência Permanente**
   - Integrar com banco de dados real
   - Histórico nunca é perdido

2. **Gráficos**
   - Evolução do capital ao longo do tempo
   - Comparação receita vs despesas

3. **Exportação**
   - PDF mensal
   - Planilha Excel

4. **Categorias Customizadas**
   - Criar suas próprias categorias de despesas
   - Análise por categoria

5. **Multi-usuário**
   - Login/autenticação
   - Cada usuário com seus dados

6. **Notificações**
   - Email quando vencimento está próximo
   - WhatsApp quando capital estiver baixo

---

## 💡 Dicas de Uso

1. **Seja consistente**: Registre TODAS as entradas e saídas
2. **Atualize diariamente**: Quanto mais atual, melhor a projeção
3. **Use simulações**: Antes de comprar, simule o impacto
4. **Respeite a reserva**: Os 10% são para emergências
5. **Planeje o dia 8**: Sempre tenha capital suficiente

---

## 📞 Suporte

Para dúvidas ou melhorias:
1. Abra uma issue no repositório
2. Entre em contato via romulomonte.com

---

## 📄 Licença

Projeto desenvolvido para uso pessoal.

---

**Desenvolvido com ❤️ usando SuperDesign.dev**

**Objetivo**: Nunca mais ficar sem capital de giro! 💪
