# ⚡ Quick Reference Card - Design System

## 🎯 Import Pattern
```jsx
import { Card, Button, PageHeader, Badge, ListItem, FormField, Alert, Modal } from '@/components/ui';
import DashboardLayout from '@/components/pages/Layouts/DashboardLayout';
```

---

## 🏗️ Basic Structure
```jsx
export default function MyPage() {
  return (
    <DashboardLayout userRole="admin|teacher|student|parent" userName="Name">
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <PageHeader title="Page Title" subtitle="Description" />
        {/* Your content */}
      </div>
    </DashboardLayout>
  );
}
```

---

## 💻 Component Quick Reference

### **Button**
```jsx
<Button variant="primary|secondary|outline" size="sm|md|lg">
  Click me
</Button>
```

### **Card**
```jsx
<Card title="Title" subtitle="Subtitle">
  Card content
</Card>
```

### **PageHeader**
```jsx
<PageHeader 
  title="Title"
  subtitle="Subtitle"
  actions={<Button>Action</Button>}
/>
```

### **FormField**
```jsx
<FormField
  label="Email"
  type="email"
  icon="📧"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  required
/>
```

### **Badge**
```jsx
<Badge variant="primary|success|warning|danger|info" size="sm|md|lg">
  Status
</Badge>
```

### **ListItem**
```jsx
<ListItem
  icon="📝"
  title="Title"
  subtitle="Subtitle"
  badge="Badge text"
  action={<Button>Action</Button>}
/>
```

### **Alert**
```jsx
<Alert
  type="success|info|warning|danger"
  title="Title"
  message="Message"
  onClose={() => setAlert(null)}
/>
```

### **Avatar**
```jsx
<Avatar src="/image.jpg" alt="Name" size="sm|md|lg|xl" />
```

### **Modal**
```jsx
<Modal
  isOpen={isOpen}
  title="Modal Title"
  size="sm|md|lg"
  onClose={() => setIsOpen(false)}
>
  Modal content
  <Button onClick={() => setIsOpen(false)}>Close</Button>
</Modal>
```

### **TableContainer**
```jsx
<TableContainer title="Table Title">
  <table className="table-custom">
    <thead>
      <tr>
        <th>Column 1</th>
        <th>Column 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
      </tr>
    </tbody>
  </table>
</TableContainer>
```

---

## 🎨 Color Palette

```javascript
const colors = {
  primary: '#4f46e5',    // Indigo
  secondary: '#6366f1',  // Light Indigo
  success: '#10b981',    // Emerald
  warning: '#f59e0b',    // Amber
  danger: '#ef4444',     // Red
  dark: '#111827',       // Dark gray (text)
  gray: '#6b7280',       // Medium gray
  lightGray: '#9ca3af',  // Light gray
  border: '#e5e7eb',     // Border gray
  bg: '#f9fafb',         // Background
  white: '#ffffff'       // White
};
```

---

## 📏 Spacing Values

```css
/* Use these exact values */
padding: 12px, 16px, 20px, 24px, 32px, 48px;
margin: 8px, 12px, 16px, 20px, 24px;
gap: 8px, 12px, 16px, 20px, 24px;
border-radius: 10px, 12px, 14px, 16px, 20px;
```

---

## 📱 Grid System

```jsx
// 2-column responsive grid
<div className="card-grid card-grid-2">
  <Card>Column 1</Card>
  <Card>Column 2</Card>
</div>

// 3-column grid
<div className="card-grid card-grid-3">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</div>

// Auto-fit responsive grid
<div className="card-grid card-grid-responsive">
  <Card>Auto 1</Card>
  <Card>Auto 2</Card>
  <Card>Auto 3</Card>
</div>
```

---

## ✅ Common Patterns

### **Stats Card**
```jsx
<Card>
  <div>
    <p style={{ margin: 0, color: '#6b7280', fontSize: '14px', fontWeight: 500 }}>
      Title
    </p>
    <h2 style={{ margin: '8px 0', fontSize: '28px', fontWeight: 700 }}>
      Value
    </h2>
    <Badge variant="success" size="sm">Status</Badge>
  </div>
</Card>
```

### **List with Actions**
```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  {items.map(item => (
    <ListItem
      key={item.id}
      icon={item.icon}
      title={item.title}
      subtitle={item.subtitle}
      action={<Button variant="outline" size="sm">Edit</Button>}
    />
  ))}
</div>
```

### **Form**
```jsx
<Card title="Form Title">
  <form>
    <FormField label="Name" placeholder="Enter name" required />
    <FormField label="Email" type="email" icon="📧" required />
    <Button variant="primary" style={{ marginTop: '16px' }}>
      Submit
    </Button>
  </form>
</Card>
```

### **Table with Badges**
```jsx
<TableContainer title="Data">
  <table className="table-custom">
    <thead>
      <tr><th>Name</th><th>Status</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>Item</td>
        <td><Badge variant="success">Active</Badge></td>
      </tr>
    </tbody>
  </table>
</TableContainer>
```

---

## 🚫 What NOT to Do

❌ Don't use Bootstrap classes
❌ Don't use custom colors (use palette only)
❌ Don't use random spacing values
❌ Don't create divs with custom styling
❌ Don't use shadow or border-radius outside the standard values
❌ Don't forget responsive testing
❌ Don't mix old and new styling

---

## ✅ What TO Do

✅ Use components from `/src/components/ui/`
✅ Import from the central index.js
✅ Use pre-defined colors
✅ Use standard spacing (8px multiples)
✅ Use grid classes for layouts
✅ Test on mobile/tablet/desktop
✅ Follow the refactored examples
✅ Keep consistency across pages

---

## 📚 Documentation Files

- **DESIGN_SYSTEM.md** - Component details & principles
- **REFACTORING_GUIDE.md** - Step-by-step migration
- **PROJECT_STATUS.md** - Overview & progress
- **IMPLEMENTATION_COMPLETE.md** - Complete summary

---

## 🎯 Refactoring Checklist

For each page:
- [ ] Import components
- [ ] Wrap with DashboardLayout
- [ ] Add PageHeader
- [ ] Replace cards with `<Card>`
- [ ] Replace forms with `<FormField>`
- [ ] Replace buttons with `<Button>`
- [ ] Replace tables with `<TableContainer>` + `.table-custom`
- [ ] Replace badges with `<Badge>`
- [ ] Remove all Bootstrap classes
- [ ] Use grid classes for layout
- [ ] Test mobile view
- [ ] Test tablet view
- [ ] Test desktop view
- [ ] Verify colors match palette
- [ ] Verify spacing is correct
- [ ] Check typography

**Expected time: 15-30 minutes per page**

---

## 🔥 Pro Tips

1. **Copy-paste from examples** - Faster than building from scratch
2. **Use Ctrl+H to find/replace** - Remove Bootstrap classes in bulk
3. **Test responsiveness** - Press F12, toggle device toolbar
4. **Use inline styles sparingly** - Prefer component props
5. **Group related fields** - Use FormGroup for multiple inputs
6. **Add loading states** - Consider user feedback while loading
7. **Test empty states** - What shows when no data?
8. **Mobile-first approach** - Design for mobile, enhance for desktop

---

## 🚀 Start Refactoring Now!

1. Pick a page from examples
2. Follow the pattern
3. Copy-paste and modify
4. Test responsive
5. Move to next page

**That's it! Quick and efficient.**

---

**Need help?** Check the documentation files in `/src/`
**Examples available in:** `*Dashboard*Refactored.jsx` files
