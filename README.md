# WE_ULTRISCAN

## Landing pública (Django / Railway)

Esta landing está preparada para renderizar assets vía `{% static %}`:

- CSS: `static/css/styles.css`
- JS: `static/js/script.js`
- Logos: `static/img/integrations/*.png`

### Configuración recomendada en Django (producción)

```python
# settings.py
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]
```

En Railway, ejecutar `collectstatic` durante el build/deploy para publicar correctamente los assets estáticos.
