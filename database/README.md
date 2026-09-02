# قاعدة البيانات - Database

## 📊 هيكل البيانات

### المجلدات:
- `data/` - ملفات البيانات الفعلية (JSON)
- `schema/` - تعاريف الـ JSON Schema
- `migrations/` - ملفات الهجرة والتحديثات

## 📁 ملفات البيانات

### 1. tasks.json
تحتوي على جميع المهام في النظام:
- المعرف الفريد
- العنوان والوصف
- حالة المهمة
- الموظف المسؤول
- الأولوية
- التواريخ المختلفة
- التعليقات و KPIs

### 2. employees.json
قائمة الموظفين:
- المعرف الفريد
- الاسم والوظيفة
- القسم والبريد الإلكتروني
- رقم الهاتف
- حالة الموظف

### 3. categories.json
فئات المهام:
- المعرف الفريد
- الاسم (عربي وإنجليزي)
- الألوان والرموز
- الوصف

### 4. kpi-definitions.json
تعاريف مؤشرات الأداء:
- أنواع KPIs المختلفة
- الأوصاف
- معايير القياس

## 🔄 هيكل البيانات الرئيسي

```
Task
├── id: string
├── title: string
├── description: string
├── assigneeId: string (Employee ID)
├── priority: enum (urgent, high, medium, low)
├── status: enum (receiving, preparation, submission, response, followup, completed)
├── categoryId: string (Category ID)
├── dates: {
│   ├── startDate
│   ├── dueDate
│   ├── completedDate
│   └── stageDates: { receiving, preparation, submission, response, followup, completed }
│ }
├── tracking: {
│   ├── isPending
│   ├── pendingSince
│   └── pendingReason
│ }
├── kpis: Array<KPI>
├── comments: Array<Comment>
└── createdAt: timestamp
```

## 📈 الإحصائيات

- **عدد المهام**: 300+
- **عدد الموظفين**: 7
- **عدد الفئات**: 30+
- **مراحل المعالجة**: 6
- **KPIs**: 5

## 🔐 معايير البيانات

### التحقق من الصحة (Validation):
- استخدام JSON Schema
- التحقق من المعرفات الفريدة
- التحقق من التواريخ والأرقام
- التحقق من الـ Enums

### التنسيق:
- الأسماء: CamelCase للإنجليزية
- المعرفات: `type_randomstring`
- التواريخ: YYYY-MM-DD
- الطوابع الزمنية: Unix Timestamp

## 🔄 التحديثات والهجرات

عند تحديث هيكل البيانات:
1. أنشئ ملف هجرة جديد في `migrations/`
2. وثّق التغييرات
3. قم بنسخ احتياطي من البيانات القديمة
4. اختبر الهجرة على بيانات نموذجية

## 📚 أمثلة الاستخدام

### الحصول على مهمة:
```javascript
const task = tasks.find(t => t.id === 'task_msu406nf03g706');
```

### تصفية المهام بالحالة:
```javascript
const activeTasks = tasks.filter(t => t.status !== 'completed');
```

### الحصول على مهام موظف معين:
```javascript
const employeeTasks = tasks.filter(t => t.assigneeId === 'emp_id');
```
