import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from apps.chat.routing import websocket_urlpatterns

import apps.chat.routing

django_asgi_app = get_asgi_application()

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trendy.settings')


application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                apps.chat.routing.websocket_urlpatterns
            )
        )
    ),
})


# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# import apps.chat.routing


# application = ProtocolTypeRouter({
#     # (http->django views is added by default)
#     "http"
#     'websocket': AuthMiddlewareStack(
#         URLRouter(
#             apps.chat.routing.websocket_urlpatterns
#         )
#     ),
# })