# 🗄️ Configuração do MongoDB Atlas

Guia passo a passo para configurar o banco de dados MongoDB Atlas (100% gratuito) para o sistema FinTech.

---

## 📋 Pré-requisitos

- Conta Google ou GitHub (para login rápido)
- 5 minutos de tempo

---

## 🚀 Passo 1: Criar Conta no MongoDB Atlas

1. Acesse: https://www.mongodb.com/cloud/atlas/register

2. Clique em **"Sign Up"**

3. Escolha uma opção:
   - Sign up with Google (recomendado)
   - Sign up with GitHub
   - Ou crie com email

4. Complete o cadastro

---

## 🏗️ Passo 2: Criar Cluster Gratuito

1. Após login, você verá a tela de boas-vindas

2. Clique em **"Build a Database"**

3. Escolha o plano **FREE** (M0):
   - ✅ 512 MB de armazenamento
   - ✅ Completamente gratuito
   - ✅ Suficiente para milhares de transações

4. Configurações do cluster:
   - **Provider**: AWS (recomendado)
   - **Region**: São Paulo (sa-east-1) - mais próximo do Brasil
   - **Cluster Name**: deixe o padrão ou use "fintech-cluster"

5. Clique em **"Create"**

⏳ Aguarde 3-5 minutos enquanto o cluster é criado...

---

## 🔐 Passo 3: Criar Usuário do Banco de Dados

1. Você verá a tela **"Security Quickstart"**

2. Em **"Database Access"**, crie um usuário:
   ```
   Username: fintech_user
   Password: [Clique em "Autogenerate Secure Password" - COPIE E SALVE!]
   ```

3. **IMPORTANTE**: Copie a senha gerada e guarde em local seguro!

4. Clique em **"Create User"**

---

## 🌐 Passo 4: Configurar Acesso de Rede

1. Na mesma tela, em **"Where would you like to connect from?"**

2. Escolha uma opção:

   ### Opção A: Acesso de Qualquer Lugar (Recomendado para desenvolvimento)
   ```
   IP Address: 0.0.0.0/0
   Description: Everywhere
   ```
   ⚠️ Use essa opção se estiver aprendendo ou testando

   ### Opção B: Acesso Restrito (Mais seguro)
   ```
   Adicione IPs específicos:
   - Seu IP local (para desenvolvimento)
   - IPs da Vercel (para produção)
   ```

3. Clique em **"Add Entry"**

4. Clique em **"Finish and Close"**

---

## 🔗 Passo 5: Obter Connection String

1. Na tela principal, clique em **"Connect"** no seu cluster

2. Escolha **"Connect your application"**

3. Configurações:
   - Driver: **Node.js**
   - Version: **6.7 or later**

4. Copie a **connection string**:
   ```
   mongodb+srv://fintech_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **IMPORTANTE**: Substitua `<password>` pela senha que você salvou no Passo 3

   Exemplo final:
   ```
   mongodb+srv://fintech_user:SuaSenhaAqui123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

---

## 💻 Passo 6A: Configurar Localmente (Desenvolvimento)

1. No seu projeto, copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. Abra o arquivo `.env` e cole sua connection string:
   ```env
   MONGODB_URI=mongodb+srv://fintech_user:SuaSenhaAqui123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

3. Salve o arquivo

4. Pronto! O sistema agora usa MongoDB localmente

---

## ☁️ Passo 6B: Configurar na Vercel (Produção)

### Via Dashboard (Recomendado):

1. Acesse: https://vercel.com/dashboard

2. Selecione seu projeto **"romulo-monte-lp"**

3. Vá em **Settings** (menu lateral)

4. Clique em **"Environment Variables"** (menu lateral)

5. Adicione nova variável:
   ```
   Name: MONGODB_URI
   Value: [Cole sua connection string completa]
   Environment: Production, Preview, Development (selecione todos)
   ```

6. Clique em **"Save"**

7. Faça um novo deploy:
   ```bash
   git add .
   git commit -m "feat: adicionar MongoDB ao fintech"
   git push
   ```

### Via CLI (Alternativa):

```bash
vercel env add MONGODB_URI production
# Cole sua connection string quando solicitado

vercel env add MONGODB_URI preview
vercel env add MONGODB_URI development
```

---

## ✅ Passo 7: Testar a Conexão

### Teste Local:

1. Inicie o servidor local:
   ```bash
   npm run dev
   ```

2. Acesse: http://localhost:3000/fintech

3. Adicione uma entrada de teste

4. Recarregue a página - os dados devem persistir

### Teste em Produção:

1. Após deploy, acesse: https://www.romulomonte.com/fintech

2. Adicione uma entrada de teste

3. Abra em outro navegador/dispositivo - os dados devem estar lá

---

## 🔍 Verificar Dados no MongoDB Atlas

1. Acesse seu cluster no MongoDB Atlas

2. Clique em **"Browse Collections"**

3. Você verá:
   ```
   Database: fintech
   Collection: finance_data
   Documents: [Seus dados aparecem aqui]
   ```

4. Explore os documentos salvos

---

## 🐛 Solução de Problemas

### Erro: "MONGODB_URI não configurado"
- ✅ Verifique se criou o arquivo `.env` localmente
- ✅ Verifique se adicionou a variável no Vercel
- ✅ Faça redeploy após adicionar variáveis

### Erro: "Authentication failed"
- ✅ Verifique se a senha está correta na connection string
- ✅ Certifique-se de substituir `<password>` pela senha real
- ✅ Não use caracteres especiais na senha (ou use URL encoding)

### Erro: "Connection timeout"
- ✅ Verifique se liberou o IP em "Network Access"
- ✅ Use 0.0.0.0/0 para liberar todos os IPs (desenvolvimento)
- ✅ Verifique sua conexão de internet

### Erro: "Database not found"
- ✅ Normal na primeira execução
- ✅ O banco será criado automaticamente no primeiro uso
- ✅ Adicione uma entrada para criar o banco

---

## 📊 Limites do Plano Gratuito (M0)

- ✅ **Armazenamento**: 512 MB
- ✅ **RAM**: Compartilhada
- ✅ **Conexões simultâneas**: 500
- ✅ **Durabilidade**: Dados permanentes
- ✅ **Sem cartão de crédito necessário**

### Quanto cabe em 512 MB?

Para o sistema FinTech:
- **~50.000 transações** (entradas + despesas)
- **Anos de uso** para um pequeno negócio
- Se encher, pode fazer upgrade ou limpar dados antigos

---

## 🔒 Segurança - Boas Práticas

1. **Nunca commite o arquivo `.env`**
   - ✅ Já está no `.gitignore`

2. **Use senhas fortes**
   - ✅ Use o gerador automático do MongoDB

3. **Restrinja IPs em produção**
   - ✅ Adicione apenas IPs da Vercel
   - IPs da Vercel: https://vercel.com/docs/concepts/edge-network/regions

4. **Monitore o uso**
   - ✅ MongoDB Atlas > Metrics
   - Verifique conexões e uso de disco

---

## 🚀 Upgrade (Opcional - Futuro)

Se precisar de mais recursos:

1. **M2 (Shared)**: $9/mês
   - 2 GB armazenamento
   - 2 GB RAM

2. **M10 (Dedicated)**: $57/mês
   - 10 GB armazenamento
   - 2 GB RAM
   - Backups automáticos

3. **M30+**: Para grandes empresas

Para o FinTech pessoal, **M0 gratuito é mais que suficiente**!

---

## 📞 Suporte

- **MongoDB Docs**: https://docs.mongodb.com/
- **Community Forums**: https://community.mongodb.com/
- **Status Page**: https://status.mongodb.com/

---

## ✅ Checklist Final

- [ ] Conta criada no MongoDB Atlas
- [ ] Cluster M0 criado
- [ ] Usuário do banco criado e senha salva
- [ ] Acesso de rede configurado (0.0.0.0/0)
- [ ] Connection string copiada
- [ ] Senha substituída na connection string
- [ ] `.env` criado localmente (desenvolvimento)
- [ ] Variável `MONGODB_URI` adicionada no Vercel (produção)
- [ ] Deploy feito no Vercel
- [ ] Teste realizado - dados persistindo

---

**Pronto! Seu sistema FinTech agora tem persistência permanente de dados! 🎉**

Os dados nunca serão perdidos, mesmo que o servidor reinicie.
Você pode acessar de qualquer dispositivo e os dados estarão lá.

---

**Tempo estimado total**: 10-15 minutos ⏱️
