import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Grid,
  Divider,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Link,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const HelpPage: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm({
      ...contactForm,
      [field]: value,
    });
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    console.log('Form submitted:', contactForm);
    setSnackbarOpen(true);
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const faqItems = [
    {
      question: 'O que é o DInfluencer?',
      answer:
        'O DInfluencer é uma plataforma que conecta marcas e influenciadores digitais, facilitando a criação de campanhas de marketing de influência. Nosso objetivo é simplificar o processo de colaboração entre marcas que desejam promover seus produtos ou serviços e influenciadores que podem alcançar seu público-alvo.',
    },
    {
      question: 'Como funciona para marcas?',
      answer:
        'As marcas podem se cadastrar gratuitamente, criar campanhas detalhando seus objetivos, orçamento e requisitos, e encontrar influenciadores adequados ao seu nicho. É possível filtrar influenciadores por categoria, plataforma, localização, número de seguidores e taxa de engajamento. Após selecionar os influenciadores, a marca pode gerenciar toda a campanha através da plataforma.',
    },
    {
      question: 'Como funciona para influenciadores?',
      answer:
        'Os influenciadores podem criar um perfil detalhado, destacando suas redes sociais, métricas, nicho e trabalhos anteriores. Eles podem procurar campanhas disponíveis que correspondam ao seu perfil, candidatar-se a elas ou receber convites diretamente das marcas. Toda a comunicação, negociação e pagamento são feitos através da plataforma.',
    },
    {
      question: 'Quais são as taxas cobradas?',
      answer:
        'O cadastro na plataforma é gratuito tanto para marcas quanto para influenciadores. Cobramos uma taxa de serviço de 10% sobre o valor das campanhas concluídas com sucesso. Para marcas com grande volume de campanhas ou influenciadores com muitos seguidores, oferecemos planos premium com taxas reduzidas e recursos adicionais.',
    },
    {
      question: 'Como são feitos os pagamentos?',
      answer:
        'Os pagamentos são processados de forma segura através da nossa plataforma. As marcas depositam o valor da campanha, que fica em uma conta garantidora até que o trabalho seja concluído e aprovado. Após a aprovação, o valor é liberado para o influenciador, descontada a taxa de serviço. Aceitamos cartões de crédito, transferências bancárias e outros métodos de pagamento.',
    },
    {
      question: 'Como garantir a segurança das transações?',
      answer:
        'Utilizamos tecnologias de criptografia avançadas para proteger todas as transações e dados pessoais. Nossa plataforma de pagamento é certificada e atende a todos os padrões de segurança do setor. Além disso, o sistema de conta garantidora assegura que os influenciadores só recebam o pagamento após a entrega do serviço e que as marcas só paguem por trabalhos aprovados.',
    },
    {
      question: 'É possível cancelar uma campanha em andamento?',
      answer:
        'Sim, é possível cancelar uma campanha, mas existem políticas específicas dependendo do estágio em que ela se encontra. Se o cancelamento ocorrer antes do início da campanha, a marca pode receber um reembolso total ou parcial. Se o influenciador já tiver iniciado o trabalho, pode haver compensação proporcional. Recomendamos sempre tentar resolver quaisquer problemas através da nossa equipe de suporte antes de optar pelo cancelamento.',
    },
    {
      question: 'Como resolver problemas ou disputas?',
      answer:
        'Temos uma equipe de suporte dedicada para mediar qualquer problema ou disputa entre marcas e influenciadores. Em caso de desacordo, ambas as partes podem abrir um chamado detalhando a situação, e nossa equipe analisará as evidências para chegar a uma resolução justa. Nosso objetivo é garantir uma experiência positiva para todos os usuários da plataforma.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Central de Ajuda e Suporte
        </Typography>
        <Typography variant="body1" paragraph>
          Bem-vindo à nossa Central de Ajuda. Aqui você encontrará respostas para as perguntas mais frequentes, além de diferentes formas de entrar em contato com nossa equipe de suporte.
        </Typography>

        <Box sx={{ mt: 4, mb: 6 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <QuestionAnswerIcon sx={{ mr: 1 }} /> Perguntas Frequentes
          </Typography>
          <Box sx={{ mt: 2 }}>
            {faqItems.map((item, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 6 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h5" gutterBottom>
              Entre em Contato
            </Typography>
            <Typography variant="body1" paragraph>
              Não encontrou o que procurava? Entre em contato conosco por um dos canais abaixo ou preencha o formulário.
            </Typography>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Email</Typography>
                    <Link href="mailto:suporte@dinfluencer.com" underline="hover">
                      suporte@dinfluencer.com
                    </Link>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Responderemos em até 24 horas em dias úteis.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">Telefone</Typography>
                    <Link href="tel:+551140028922" underline="hover">
                      (11) 4002-8922
                    </Link>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Disponível de segunda a sexta, das 9h às 18h.
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WhatsAppIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Box>
                    <Typography variant="subtitle1">WhatsApp</Typography>
                    <Link href="https://wa.me/551140028922" target="_blank" rel="noopener" underline="hover">
                      (11) 4002-8922
                    </Link>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Atendimento rápido para questões simples.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
              <Typography variant="h5" gutterBottom>
                Formulário de Contato
              </Typography>
              <form onSubmit={handleSubmitContactForm}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Nome"
                      value={contactForm.name}
                      onChange={(e) => handleContactFormChange('name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => handleContactFormChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Assunto"
                      value={contactForm.subject}
                      onChange={(e) => handleContactFormChange('subject', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Mensagem"
                      multiline
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => handleContactFormChange('message', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<SendIcon />}
                    >
                      Enviar Mensagem
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default HelpPage;