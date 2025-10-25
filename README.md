# rtp

Um espaço minimalista para reflexões, código e experimentos.

## Sobre

Site pessoal construído com [Pelican](https://getpelican.com/), um gerador de sites estáticos em Python. Design minimalista focado no conteúdo, com layout responsivo e otimizado para leitura.

## Tecnologias

- **Pelican** - Gerador de sites estáticos
- **Markdown** - Para escrita dos posts
- **HTML/CSS** - Theme personalizado minimalista
- **GitHub Pages** - Hospedagem e deploy automático

## Estrutura

```
├── content/
│   ├── blog/                 # artigos de reflexão e poesia
│   ├── lab/                  # posts técnicos, tutoriais, experiências
│   └── pages/                # páginas estáticas
├── theme/
│   ├── static/css/
│   └── templates/
├── .github/workflows/        # GitHub Actions para deploy
├── pelicanconf.py           # configuração de desenvolvimento
└── publishconf.py           # configuração de produção
```

## Desenvolvimento local

```bash
# Instalar dependências (requer Python)
pip install pelican[markdown]

# Gerar site
pelican content

# Servidor local com auto-reload
pelican --autoreload --listen

# Acessar em http://localhost:8000
```

## Deploy

O site é automaticamente atualizado no GitHub Pages através de GitHub Actions a cada push na branch `main`.

**URL:** https://robson-rp.github.io/rtp

## Autor

**Robson Paulo** - Desenvolvedor e escritor ocasional baseado em Angola.

## Licença

Conteúdo disponível sob licença Creative Commons. Código do tema sob licença MIT.