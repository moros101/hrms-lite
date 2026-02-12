"""
Convenience entrypoint (optional).
Run: python -m hrms
"""

from django.core.management import execute_from_command_line

execute_from_command_line(["manage.py", "runserver"])

