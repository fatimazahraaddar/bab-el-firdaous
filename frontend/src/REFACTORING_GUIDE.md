# 🎯 Complete Refactoring Guide: Bootstrap → Modern Design System

## 📊 Overview

This guide shows how to refactor every page in the project from Bootstrap styles to the unified modern design system. This includes **Admin**, **Teacher**, **Student**, and **Parent** roles across all ~94 pages.

---

## 🚀 Quick Start

### 1. **Import UI Components**
```jsx
import {
  Card,
  Button,
  PageHeader,
  Badge,
  Avatar,
  Alert,
  ListItem,
  Modal,
  FormField,
  FormGroup,
  TableContainer
} from '@/components/ui';
```

### 2. **Use DashboardLayout for All Pages**
```jsx
<DashboardLayout userRole="admin|teacher|student|parent" userName="Name">
  {/* Your page content */}
</DashboardLayout>
```

### 3. **Replace Bootstrap with Components**
- `.card` → `<Card>`
- `.btn` → `<Button>`
- `.page-title` → `<PageHeader>`
- `.form-control` → `<FormField>`
- `.badge` → `<Badge>`
- `.table` → `<TableContainer>` + `.table-custom`

---

## 📋 Page Refactoring Examples

### Example 1: Simple Dashboard Page

#### BEFORE (Bootstrap)
```jsx
import DashboardLayout from '@/components/pages/Layouts/DashboardLayout';

export default function Dashboard() {
  return (
    <DashboardLayout userRole="student" userName="Ahmed">
      <div className="container-fluid">
        <h2 className="fw-bold mb-4">Dashboard</h2>
        
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm p-3">
              <p className="text-muted">Total Grades</p>
              <h4 className="fw-bold">87%</h4>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
```

#### AFTER (Modern)
```jsx
import DashboardLayout from '@/components/pages/Layouts/DashboardLayout';
import { Card, PageHeader, Badge } from '@/components/ui';

export default function Dashboard() {
  return (
    <DashboardLayout userRole="student" userName="Ahmed">
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <PageHeader
          title="Dashboard"
          subtitle="Your academic overview"
        />
        
        <Card>
          <div>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>
              Total Average
            </p>
            <h2 style={{ margin: '8px 0', fontSize: '28px', fontWeight: 700 }}>87%</h2>
            <Badge variant="success" size="sm">Excellent</Badge>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
```

---

### Example 2: Table Page

#### BEFORE (Bootstrap)
```jsx
<div className="card border-0 shadow-sm">
  <div className="card-body">
    <h5 className="fw-semibold mb-3">Students</h5>
    <table className="table table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ahmed</td>
          <td>92%</td>
          <td><span className="badge bg-success">Pass</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

#### AFTER (Modern)
```jsx
import { TableContainer, Badge } from '@/components/ui';

<TableContainer title="Students">
  <table className="table-custom">
    <thead>
      <tr>
        <th>Name</th>
        <th>Grade</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ahmed</td>
        <td>92%</td>
        <td><Badge variant="success">Pass</Badge></td>
      </tr>
    </tbody>
  </table>
</TableContainer>
```

---

### Example 3: Form Page

#### BEFORE (Bootstrap)
```jsx
<div className="card border-0 shadow-sm">
  <form>
    <div className="mb-3">
      <label className="form-label">Email</label>
      <input 
        type="email" 
        className="form-control" 
        placeholder="Enter email"
      />
    </div>
    <button className="btn btn-primary">Submit</button>
  </form>
</div>
```

#### AFTER (Modern)
```jsx
import { Card, FormField, Button } from '@/components/ui';

<Card title="Contact Information">
  <form>
    <FormField
      label="Email"
      type="email"
      icon="📧"
      placeholder="Enter email"
      required
    />
    <Button variant="primary">Submit</Button>
  </form>
</Card>
```

---

### Example 4: List Page

#### BEFORE (Bootstrap)
```jsx
<div className="card">
  <div className="card-body">
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        <strong>Item 1</strong>
        <small className="text-muted">Description</small>
      </li>
    </ul>
  </div>
</div>
```

#### AFTER (Modern)
```jsx
import { Card, ListItem } from '@/components/ui';

<Card title="Items List">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <ListItem
      icon="📝"
      title="Item 1"
      subtitle="Description"
      action={<Button variant="outline" size="sm">Edit</Button>}
    />
  </div>
</Card>
```

---

## 🔄 Migration Steps by Page Type

### For CRUD Pages (Create, Read, Update, Delete)

1. **Replace Card Components**
   ```jsx
   // Before: <div className="card">
   // After:  <Card title="...">
   ```

2. **Replace Forms**
   ```jsx
   // All <input>, <select>, <textarea> → use <FormField>
   ```

3. **Replace Tables**
   ```jsx
   // Replace <table className="table"> with <TableContainer>
   ```

4. **Replace Buttons**
   ```jsx
   // All <button className="btn"> → use <Button>
   ```

5. **Add PageHeader**
   ```jsx
   <PageHeader title="Page Title" subtitle="Description" />
   ```

---

### For List/Display Pages

1. Replace sections with `<Card>`
2. Replace items with `<ListItem>`
3. Replace badges with `<Badge>`
4. Add `<PageHeader>` at top

### For Detail Pages

1. Replace card with `<Card>`
2. Use `<FormField>` for editable fields
3. Use `<BadgeLinks badges with statuses
4. Use `<Button>` for actions

---

## 📱 Responsive Grid System

### Grid Classes

```jsx
// 2-column grid (automatically 1 column on mobile)
<div className="card-grid card-grid-2">
  <Card>Column 1</Card>
  <Card>Column 2</Card>
</div>

// 3-column grid
<div className="card-grid card-grid-3">
  <Card>Column 1</Card>
  <Card>Column 2</Card>
  <Card>Column 3</Card>
</div>

// Responsive auto-fit
<div className="card-grid card-grid-responsive">
  <Card>Auto 1</Card>
  <Card>Auto 2</Card>
  <Card>Auto 3</Card>
</div>
```

---

## 🎨 Spacing Guidelines

```jsx
// Padding: always use fixed values
padding: '16px', '24px', '32px'

// Gap between items
gap: '8px', '12px', '16px', '24px'

// Margin: use classes or style
margin: '0 0 24px 0'
```

---

## ✅ Master Checklist for Each Page

- [ ] Replace all `.card` with `<Card>`
- [ ] Replace all `.btn` with `<Button>`
- [ ] Replace all `.form-control` with `<FormField>`
- [ ] Replace all `.table` with `<TableContainer>` + `.table-custom`
- [ ] Replace all `.badge` with `<Badge>`
- [ ] Remove all Bootstrap classes (col-, row, g-, mb-, etc.)
- [ ] Add `<PageHeader>` at the top
- [ ] Use grid classes for layouts
- [ ] Test mobile responsiveness
- [ ] Check color consistency
- [ ] Verify spacing and alignment

---

## 🔍 Troubleshooting

### Issue: Layout doesn't wrap on mobile
**Solution:** Use `.card-grid` classes instead of custom grids

### Issue: Text color looks wrong
**Solution:** Use standard colors: `#111827` (dark), `#6b7280` (gray), `#4f46e5` (primary)

### Issue: Spacing looks off
**Solution:** Use predefined: `16px`, `24px`, `32px` instead of random values

### Issue: Input looks different
**Solution:** Use `<FormField>` component instead of raw inputs

---

## 📚 Reference Pages

Refactored examples available:
- `AdminDashboardRefactored.jsx` - Admin dashboard template
- `TeacherDashboardRefactored.jsx` - Teacher dashboard template
- `StudentDashboardRefactored.jsx` - Student dashboard template
- `ParentDashboardRefactored.jsx` - Parent dashboard template

Copy these patterns for other pages!

---

## 🚀 Batch Refactoring Strategy

### Phase 1: High-Impact Pages
- Admin Dashboard
- Student Dashboard  
- Teacher Dashboard
- Parent Dashboard

### Phase 2: CRUD Pages
- Add/Edit Student
- Add/Edit Teacher
- Add/Edit Parent
- Add/Edit Class

### Phase 3: List Pages
- Students List
- Teachers List
- Classes List
- Announcements List

### Phase 4: Detail Pages
- Student Details
- Teacher Details
- Class Details

### Phase 5: Utility Pages
- Settings
- Profile
- Messages
- Notifications

---

## 💡 Pro Tips

1. **Bulk Copy-Paste**: Copy structure from refactored examples
2. **Use IDE Search**: Find and replace Bootstrap classes
3. **Test as You Go**: Test each page on mobile
4. **Keep DRY**: Extract repeated sections to components
5. **Prepare for Data**: Use props and state for dynamic content

---

## 📞 Questions?

Refer to:
- `/src/DESIGN_SYSTEM.md` for component API
- Refactored examples for patterns
- `/src/components/ui/` for component source

**Each component is well-documented and ready to use!**
