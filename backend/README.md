# Ashmal-2026 Backend API

## 🚀 البدء السريع

### التثبيت

```bash
cd backend
npm install
```

### التطوير

```bash
npm run dev
```

سيبدأ الخادم على `http://localhost:3000`

## 📝 API Endpoints

### المهام (Tasks)

- `GET /api/tasks` - الحصول على جميع المهام
- `GET /api/tasks/:id` - الحصول على مهمة واحدة
- `POST /api/tasks` - إنشاء مهمة جديدة
- `PUT /api/tasks/:id` - تحديث مهمة
- `DELETE /api/tasks/:id` - حذف مهمة
- `GET /api/tasks/status/:status` - الحصول على مهام بحسب الحالة
- `GET /api/tasks/assignee/:assigneeId` - الحصول على مهام موظف معين
- `POST /api/tasks/:id/comments` - إضافة تعليق
- `POST /api/tasks/:id/kpis` - إضافة KPI

### الموظفون (Employees)

- `GET /api/employees` - الحصول على جميع الموظفين
- `GET /api/employees/:id` - الحصول على موظف واحد
- `POST /api/employees` - إنشاء موظف جديد
- `PUT /api/employees/:id` - تحديث موظف
- `DELETE /api/employees/:id` - حذف موظف

### الفئات (Categories)

- `GET /api/categories` - الحصول على جميع الفئات
- `GET /api/categories/:id` - الحصول على فئة واحدة
- `POST /api/categories` - إنشاء فئة جديدة
- `PUT /api/categories/:id` - تحديث فئة
- `DELETE /api/categories/:id` - حذف فئة

## 🔌 WebSocket Events

### Server Events

- `task:update` - تحديث مهمة
- `task:create` - إنشاء مهمة جديدة
- `task:delete` - حذف مهمة
- `task:updated` - تم تحديث مهمة (broadcast)
- `task:created` - تم إنشاء مهمة (broadcast)
- `task:deleted` - تم حذف مهمة (broadcast)

## 🔒 المتغيرات البيئية

انسخ `.env.example` إلى `.env` وحدث القيم:

```bash
cp .env.example .env
```

## 📚 نموذج البيانات

### Task
```javascript
{
  id: string,
  title: string,
  description: string,
  assigneeId: string,
  priority: 'urgent' | 'high' | 'medium' | 'low',
  status: 'receiving' | 'preparation' | 'submission' | 'response' | 'followup' | 'completed',
  categoryId: string,
  startDate: string,
  dueDate: string,
  completedDate: string | null,
  stageDates: object,
  isPending: boolean,
  pendingSince: string,
  pendingReason: string,
  kpis: array,
  comments: array,
  createdAt: number
}
```

### Employee
```javascript
{
  id: string,
  name: string,
  role: string,
  dept: string,
  email: string,
  phone: string,
  createdAt: string,
  status: 'active' | 'inactive' | 'on_leave'
}
```

### Category
```javascript
{
  id: string,
  name_ar: string,
  name_en: string,
  color: string,
  icon: string
}
```

## 🧪 الاختبار

```bash
npm test
```

## 📖 التوثيق

راجع `docs/api.md` للمزيد من التفاصيل.
