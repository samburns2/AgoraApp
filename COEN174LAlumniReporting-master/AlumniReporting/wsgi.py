# Authors: Sam Burns, Simran Judge, Jack Ryan
# wsgi.py: Specifies settings for the WSGI server hosting the application.
"""
WSGI config for AlumniReporting project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AlumniReporting.settings')

application = get_wsgi_application()
