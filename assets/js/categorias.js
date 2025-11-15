
// Retorna lista ordenada alfabeticamente de 50 categorias de serviços.
router.get('/', (req, res) => {
  const categorias = [
    'Diarista',
    'Faxineiro(a)',
    'Cozinheiro(a)',
    'Jardineiro(a)',
    'Pedreiro',
    'Pintor',
    'Eletricista',
    'Encanador',
    'Marceneiro',
    'Vidraceiro',
    'Serralheiro',
    'Chaveiro',
    'Desentupidor',
    'Dedetizador',
    'Montador de móveis',
    'Organizador profissional',
    'Personal organizer',
    'Babá de animais',
    'Adestrador de cães',
    'Veterinário',
    'Tosador (Pet)',
    'Cuidador de idosos',
    'Enfermeiro(a)',
    'Fisioterapeuta',
    'Técnico de informática',
    'Programador',
    'Designer gráfico',
    'Fotógrafo',
    'Cinegrafista',
    'Maquiador(a)',
    'Cabeleireiro(a)',
    'Manicure',
    'Barbeiro',
    'Esteticista',
    'Massoterapeuta',
    'Personal trainer',
    'Professor particular',
    'Instrutor de música',
    'Tradutor',
    'Advogado',
    'Contador',
    'Arquiteto',
    'Engenheiro',
    'Motorista particular',
    'Entregador',
    'Mudanças',
    'Mecânico',
    'Lavador de carros',
    'Organizador de eventos',
    'Buffet'
  ];

  res.json({
    success: true,
    count: categorias.length,
    categorias: categorias.sort()
  });
});

module.exports = router;
