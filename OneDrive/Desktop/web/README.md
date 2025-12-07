# Smart Study Planner - Premium AI-Powered Learning Management System

A fully responsive, modern, and visually stunning web application for managing study tasks, creating schedules, and tracking progress with AI-powered recommendations.

## ✨ Features

### 🎯 Core Features
- **Landing Page** - Stunning hero section with animated gradients and floating cards
- **Dashboard** - Complete overview with today's tasks, progress tracking, and quick actions
- **Task Manager** - Create, edit, delete, and organize study tasks with priorities
- **AI Suggestions** - Smart recommendations based on your tasks and study habits
- **Weekly Timetable** - Visual schedule planning with drag-and-drop interface
- **Analytics & Insights** - Charts showing weekly progress, completion rates, and subject distribution

### 💾 Data Persistence
- All tasks and timetables saved to **localStorage**
- No backend required - fully frontend-based
- Data persists across browser sessions

### 🎨 Design Highlights
- **Modern UI** - Glassmorphism effects, soft shadows, smooth animations
- **Gradient Themes** - Premium color schemes (Indigo, Pink, Teal)
- **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- **Smooth Interactions** - Hover effects, transitions, and CSS animations
- **Premium Typography** - Clean, modern font hierarchy

## 📁 Project Structure

```
web/
├── index.html              # Main HTML file with all sections
├── css/
│   └── style.css          # Complete styling with responsive design
├── js/
│   └── app.js             # All JavaScript functionality
└── assets/                 # (For future assets like icons, images)
```

## 🚀 How to Use

### 1. **Open the Application**
Simply open `index.html` in any modern web browser.

### 2. **Getting Started**
- The app loads with sample tasks for demonstration
- Navigate through sections using the navigation bar
- All data is automatically saved to your browser's localStorage

### 3. **Add a Task**
1. Click "Add New Task" or "Start Planning" button
2. Fill in task details:
   - Task Title *
   - Subject *
   - Duration (in hours) *
   - Priority (High/Medium/Low) *
   - Deadline (optional)
   - Description (optional)
3. Click "Create Task"

### 4. **View Dashboard**
- See today's tasks
- Track your completion progress with a visual ring
- Get your streak count
- Use quick action buttons

### 5. **Generate AI Suggestions**
1. Click "AI Suggestion" button
2. App analyzes your pending tasks
3. Recommends:
   - Priority subjects to study
   - Daily study hours needed
   - Break intervals

### 6. **Plan Your Week**
1. Go to "Timetable" section
2. Click on any time slot to add a subject
3. Click on a subject to remove it
4. View and manage your complete weekly schedule

### 7. **Track Progress**
- View analytics on the Analytics page
- See weekly study hours
- Track completion rates
- Analyze subject distribution

## 🎯 JavaScript Functions Reference

### Task Management
- `loadTasks()` - Load tasks from localStorage
- `saveTasks(tasks)` - Save tasks to localStorage
- `addTask(event)` - Create new task
- `deleteTask(taskId)` - Remove a task
- `toggleTaskComplete(taskId)` - Mark task as done
- `renderTasks()` - Display all tasks

### Timetable
- `loadTimetable()` - Load timetable from localStorage
- `saveTimetable(timetable)` - Save timetable
- `renderTimetable()` - Display weekly grid
- `addSubjectToTimetable(day, hour)` - Add subject to slot
- `removeSubjectFromTimetable(day, hour)` - Remove subject

### AI & Suggestions
- `generateAISuggestion()` - Create smart study plan
- `displaySuggestion(subjects, hours, breaks)` - Show recommendations

### Dashboard
- `updateDashboard()` - Update all dashboard cards
- `updateDashboard()` - Refresh statistics

### Utilities
- `scrollToSection(sectionId)` - Navigate sections smoothly
- `formatDate(dateStr)` - Format dates for display

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #6366f1;      /* Indigo */
    --secondary-color: #ec4899;    /* Pink */
    --accent-color: #14b8a6;       /* Teal */
    /* ... more colors ... */
}
```

### Typography
Change fonts in body CSS:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

### Animations
Modify keyframes in `css/style.css` for custom effects:
- `@keyframes float` - Floating element animation
- `@keyframes slideInUp` - Modal entrance
- `@keyframes fillCircle` - Progress ring animation

## 🔧 Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with flexbox/grid, animations, gradients
- **JavaScript (Vanilla)** - No frameworks, all functionality
- **Font Awesome 6.4** - Icon library
- **localStorage API** - Client-side data persistence

## 📱 Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 🌟 Key Highlights

1. **AI-Powered Logic** - Prioritizes tasks by deadline and urgency
2. **Smart Break Intervals** - Suggests optimal study/break ratios
3. **Visual Analytics** - Charts and progress indicators
4. **Glassmorphism Design** - Modern frosted glass effects
5. **Smooth Interactions** - Every interaction has a smooth animation
6. **Mobile-First** - Responsive design works on all devices
7. **No Dependencies** - Pure HTML/CSS/JavaScript
8. **Dark Footer** - Professional footer section

## 💡 Future Enhancement Ideas

- Dark mode toggle
- Export tasks to PDF
- Calendar view
- Pomodoro timer integration
- Sync with cloud storage
- Study session recording
- Performance metrics
- Mobile app version

## 📝 License

Free to use and modify for personal and educational purposes.

## 🙌 Support

For issues or improvements, feel free to modify the code!

---

**Version:** 1.0  
**Last Updated:** December 7, 2024  
**Created by:** Smart Study Team
