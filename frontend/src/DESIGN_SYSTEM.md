# 🎨 Modern Design System Documentation

## Overview
This document outlines the unified modern SaaS design system applied across all pages in the school management application.

---

## 🎯 Design Principles

### Colors
- **Primary**: `#4f46e5` (Indigo)
- **Secondary**: `#6366f1` (Indigo Light)
- **Success**: `#10b981` (Emerald)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)
- **Gray**: `#6b7280` (Neutral)
- **Background**: `#f9fafb` (Off-white)
- **White**: `#ffffff` (Pure white)

### Typography
- **Font**: Inter (system-fallback)
- **Size Scale**: 12px - 36px
- **Weights**: 400, 500, 600, 700, 800

### Spacing
- **Base unit**: 8px
- **Padding**: 12px, 16px, 20px, 24px, 32px, 48px
- **Gap**: 8px, 12px, 16px, 20px, 24px

### Borders & Shadows
- **Rounded corners**: 10px, 12px, 14px, 16px, 20px
- **Border**: 1.5px solid #e5e7eb
- **Shadow**: `0 10px 40px rgba(0, 0, 0, 0.06)`

---

## 📦 Component Library

### Reusable Components

#### 1. **Card Component**
```jsx
import { Card } from '@/components/ui';

<Card title="Card Title" subtitle="Subtitle">
  Content here
</Card>
```

#### 2. **Button Component**
```jsx
import { Button } from '@/components/ui';

// Variants: primary, secondary, outline
// Sizes: sm, md, lg
<Button variant="primary" size="md">
  Click me
</Button>
```

#### 3. **PageHeader Component**
```jsx
import { PageHeader, Button } from '@/components/ui';

<PageHeader 
  title="Page Title"
  subtitle="Page description"
  actions={<Button>Action</Button>}
/>
```

#### 4. **FormField Component**
```jsx
import { FormField } from '@/components/ui';

<FormField
  label="Email"
  type="email"
  icon="📧"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
/>
```

#### 5. **TableContainer Component**
```jsx
import { TableContainer } from '@/components/ui';

<TableContainer title="Data Table">
  <table className="table-custom">
    {/* Table content */}
  </table>
</TableContainer>
```

#### 6. **Badge Component**
```jsx
import { Badge } from '@/components/ui';

// Variants: primary, success, warning, danger, info
// Sizes: sm, md, lg
<Badge variant="success" size="md">
  Online
</Badge>
```

#### 7. **Avatar Component**
```jsx
import { Avatar } from '@/components/ui';

// Sizes: sm, md, lg, xl
<Avatar src="/path/to/image.jpg" alt="User" size="md" />
```

#### 8. **Alert Component**
```jsx
import { Alert } from '@/components/ui';

// Types: info, success, warning, danger
<Alert 
  type="success"
  title="Success!"
  message="Operation completed"
  onClose={() => setAlert(null)}
/>
```

#### 9. **ListItem Component**
```jsx
import { ListItem } from '@/components/ui';

<ListItem
  icon="📝"
  title="Item Title"
  subtitle="Subtitle"
  badge="New"
/>
```

#### 10. **Modal Component**
```jsx
import { Modal } from '@/components/ui';

<Modal 
  isOpen={isOpen}
  title="Modal Title"
  size="md"
  onClose={() => setIsOpen(false)}
>
  Modal content
</Modal>
```

---

## 🏗️ Layout Structure

### DashboardLayout (All Authenticated Pages)
```jsx
<DashboardLayout userRole="admin" userName="John Doe">
  {/* Page content */}
</DashboardLayout>
```

### Sidebar Navigation
- Icons + labels
- Active state highlighting
- Hover effects
- Same structure for all roles

### TopBar/Header
- Page title (dynamic based on route)
- Search bar
- Notifications
- User profile

---

## 📱 Responsive Design Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

---

## 🎨 CSS Classes

### Utility Classes

#### Grids
```css
.card-grid          /* Base grid: gap 20px */
.card-grid-2        /* 2 columns */
.card-grid-3        /* 3 columns */
.card-grid-responsive /* Auto-fit responsive grid */
```

#### Text
```css
.text-primary       /* Primary color text */
.text-muted         /* #6b7280 gray */
```

#### Background
```css
.bg-surface         /* White background */
```

---

## ✅ Migration Checklist

### Convert Bootstrap to Modern Design

- [ ] Replace `.card` with `<Card>` component
- [ ] Replace `.btn` with `<Button>` component
- [ ] Replace `.form-control` with `<FormField>` component
- [ ] Replace `.page-title` with `<PageHeader>` component
- [ ] Replace `.table` with `.table-custom` + `<TableContainer>`
- [ ] Replace `.badge` with `<Badge>` component
- [ ] Replace `.alert` with `<Alert>` component
- [ ] Replace raw lists with `<ListItem>` component
- [ ] Remove all Bootstrap CSS classes
- [ ] Test responsive design
- [ ] Ensure consistent spacing and typography

---

## 🚀 Example: Refactored Admin Dashboard

See `AdminDashboardRefactored.jsx` for a complete example.

---

## 💡 Best Practices

1. **Use components** - Don't create divs with Bootstrap classes
2. **Consistent spacing** - Use predefined spacing values
3. **Color scheme** - Only use colors from the palette
4. **Responsive** - Test on mobile, tablet, desktop
5. **Accessibility** - Use semantic HTML, proper labels
6. **Reusable** - Build components, not pages
7. **State management** - Use useState/Context, prepare for dynamic data

---

## 📞 Questions?

This design system is built to be scalable and maintainable. All components are located in `/components/ui` and can be imported as needed.
