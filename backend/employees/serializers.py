from rest_framework import serializers
from .models import Employee, Attendance
from django.utils import timezone

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'employee_id', 'full_name', 'email', 'department', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_employee_id(self, value):
        if not value.strip():
            raise serializers.ValidationError("Employee ID cannot be empty")
        return value

class AttendanceSerializer(serializers.ModelSerializer):
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())

    class Meta:
        model = Attendance
        fields = ['id', 'employee', 'date', 'status']

    def validate_date(self, value):
        # don't allow future dates
        if value > timezone.now().date():
            raise serializers.ValidationError("Date cannot be in the future.")
        return value

    def validate(self, attrs):
        emp = attrs.get('employee')
        date = attrs.get('date')
        if Attendance.objects.filter(employee=emp, date=date).exists():
            raise serializers.ValidationError("Attendance for this employee on this date already exists.")
        return attrs
