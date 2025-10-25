AUTHOR = 'Robson Paulo'
SITENAME = 'rtp'
SITEURL = ""
SITESUBTITLE = 'reflexões • código • experimentos'

PATH = "content"

TIMEZONE = 'Africa/Luanda'
DEFAULT_LANG = 'pt'

# Estrutura de URLs limpa
ARTICLE_URL = '{category}/{slug}/'
ARTICLE_SAVE_AS = '{category}/{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'

# Categorias personalizadas
USE_FOLDER_AS_CATEGORY = True
DISPLAY_CATEGORIES_ON_MENU = True

# Menu principal
MENUITEMS = (
    ('Blog', '/category/blog.html'),
    ('Lab', '/category/lab.html'),
    ('Sobre', '/about/'),
    ('Categorias', '/categories.html'),
)

# Configuração para INDEX como página inicial
INDEX_SAVE_AS = 'index.html'
DIRECT_TEMPLATES = ['index', 'tags', 'categories', 'archives']

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Remover links padrão
LINKS = ()
SOCIAL = ()

DEFAULT_PAGINATION = 10

# Theme settings
THEME = 'theme'
DISPLAY_PAGES_ON_MENU = False

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
    },
    'output_format': 'html5',
}