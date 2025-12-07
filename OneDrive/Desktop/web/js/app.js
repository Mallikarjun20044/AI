/* ========================================
   SMART STUDY PLANNER - JAVASCRIPT
   Core Functionality & Interactions
   ======================================== */

// ========================================
// DATA MANAGEMENT - LOCALSTORAGE
// ========================================

/**
 * Load tasks from localStorage
 * @returns {Array} Array of task objects
 */
function loadTasks() {
    const tasks = localStorage.getItem('studyTasks');
    return tasks ? JSON.parse(tasks) : [];
}

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of task objects to save
 */
function saveTasks(tasks) {
    localStorage.setItem('studyTasks', JSON.stringify(tasks));
    updateDashboard();
}

/**
 * Load timetable from localStorage
 * @returns {Object} Timetable data structure
 */
function loadTimetable() {
    const timetable = localStorage.getItem('studyTimetable');
    return timetable ? JSON.parse(timetable) : initializeTimetable();
}

/**
 * Initialize empty timetable structure
 * @returns {Object} Empty timetable object
 */
function initializeTimetable() {
    const hours = [];
    for (let i = 8; i <= 22; i++) {
        hours.push(i);
    }
    
    const timetable = {};
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
        timetable[day] = {};
        hours.forEach(hour => {
            timetable[day][hour] = '';
        });
    });
    return timetable;
}

/**
 * Save timetable to localStorage
 * @param {Object} timetable - Timetable object to save
 */
function saveTimetable(timetable) {
    localStorage.setItem('studyTimetable', JSON.stringify(timetable));
}

// ========================================
// TASK MANAGEMENT
// ========================================

/**
 * Open task creation modal
 */
function openTaskModal() {
    document.getElementById('taskModal').classList.add('active');
    document.getElementById('taskForm').reset();
}

/**
 * Close task modal
 */
function closeTaskModal() {
    document.getElementById('taskModal').classList.remove('active');
}

/**
 * Add new task
 * @param {Event} event - Form submission event
 */
function addTask(event) {
    event.preventDefault();
    
    const task = {
        id: Date.now(),
        title: document.getElementById('taskTitle').value,
        subject: document.getElementById('taskSubject').value,
        duration: parseFloat(document.getElementById('taskDuration').value),
        priority: document.getElementById('taskPriority').value,
        deadline: document.getElementById('taskDeadline').value,
        description: document.getElementById('taskDescription').value,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
    
    closeTaskModal();
    renderTasks();
}

/**
 * Delete a task
 * @param {number} taskId - ID of task to delete
 */
function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = loadTasks();
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        saveTasks(filteredTasks);
        renderTasks();
    }
}

/**
 * Toggle task completion status
 * @param {number} taskId - ID of task to toggle
 */
function toggleTaskComplete(taskId) {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks();
    }
}

/**
 * Render all tasks in the task container
 */
function renderTasks() {
    const container = document.getElementById('tasksContainer');
    const filterValue = document.getElementById('taskFilter')?.value.toLowerCase() || '';
    
    let tasks = loadTasks();
    
    // Filter tasks based on search
    if (filterValue) {
        tasks = tasks.filter(task => 
            task.title.toLowerCase().includes(filterValue) ||
            task.subject.toLowerCase().includes(filterValue)
        );
    }
    
    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>No tasks yet. Create one to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = tasks.map(task => {
        const priorityColor = {
            'high': 'danger',
            'medium': 'warning',
            'low': 'success'
        }[task.priority] || 'primary';
        
        const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.completed;
        
        return `
            <div class="task-card ${task.completed ? 'completed' : ''}">
                <div class="task-header">
                    <div class="task-title">
                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                               onchange="toggleTaskComplete(${task.id})">
                        <span style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">${task.title}</span>
                    </div>
                    <span class="task-priority ${task.priority}">${task.priority}</span>
                </div>
                <div class="task-meta">
                    <div class="task-meta-item">
                        <i class="fas fa-book"></i> ${task.subject}
                    </div>
                    <div class="task-meta-item">
                        <i class="fas fa-clock"></i> ${task.duration}h
                    </div>
                    ${task.deadline ? `
                        <div class="task-meta-item" style="color: ${isOverdue ? 'var(--danger)' : 'var(--text-secondary)'}">
                            <i class="fas fa-calendar"></i> ${new Date(task.deadline).toLocaleDateString()}
                        </div>
                    ` : ''}
                </div>
                ${task.description ? `<p style="color: var(--text-secondary); font-size: 0.9rem;">${task.description}</p>` : ''}
                <div class="task-actions">
                    <button class="task-btn" title="Edit" onclick="alert('Edit feature coming soon!')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn" title="Delete" onclick="deleteTask(${task.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// ========================================
// DASHBOARD UPDATES
// ========================================

/**
 * Update dashboard with current data
 */
function updateDashboard() {
    const tasks = loadTasks();
    const completedTasks = tasks.filter(t => t.completed).length;
    const taskCount = tasks.length;
    
    // Update task count
    document.getElementById('taskCount').textContent = taskCount;
    
    // Update progress
    const completionPercentage = taskCount === 0 ? 0 : Math.round((completedTasks / taskCount) * 100);
    document.getElementById('progressPercentage').textContent = completionPercentage + '%';
    
    // Animate progress ring
    const circle = document.querySelector('.progress-ring-circle');
    if (circle) {
        circle.classList.add('animated');
        const circumference = 2 * Math.PI * 54;
        const offset = circumference - (completionPercentage / 100) * circumference;
        circle.style.strokeDashoffset = offset;
    }
    
    // Update tasks preview
    const preview = document.getElementById('tasksPreview');
    const upcomingTasks = tasks.filter(t => !t.completed).slice(0, 3);
    
    if (upcomingTasks.length === 0) {
        preview.innerHTML = '<p class="empty-state">All tasks completed! 🎉</p>';
    } else {
        preview.innerHTML = upcomingTasks.map(task => `
            <div class="task-item">
                <input type="checkbox" onchange="toggleTaskComplete(${task.id})">
                <span>${task.title} (${task.duration}h)</span>
            </div>
        `).join('');
    }
    
    // Update analytics
    document.getElementById('completionRate').textContent = completionPercentage + '%';
    document.getElementById('totalTasks').textContent = taskCount;
    document.getElementById('completedTasks').textContent = completedTasks;
}

// ========================================
// AI SUGGESTIONS
// ========================================

/**
 * Generate smart study plan based on tasks
 */
function generateAISuggestion() {
    const tasks = loadTasks();
    const subjects = [...new Set(tasks.map(t => t.subject))];
    
    // If no tasks yet, use default semester subjects to showcase AI plan
    const fallbackSubjects = [
        'Web Technology',
        'Theory of Computation',
        'Computer Networks',
        'Artificial Intelligence',
        'Research & Methodologies',
        'Software Engineering'
    ];

    if (subjects.length === 0) {
        displaySuggestion(fallbackSubjects.slice(0, 4), 3, '50-10');
        return;
    }
    
    // Simple AI logic: prioritize by deadline and high priority tasks
    const prioritizedSubjects = tasks
        .filter(t => !t.completed)
        .sort((a, b) => {
            const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        })
        .slice(0, 4)
        .map(t => t.subject);
    
    // Calculate suggested study hours
    const totalHours = tasks.reduce((sum, t) => sum + (t.completed ? 0 : t.duration), 0);
    const dailyHours = Math.ceil(totalHours / 7);
    
    // Suggest break intervals
    const breakInterval = dailyHours >= 4 ? '50-10' : dailyHours >= 2 ? '45-15' : '30-5';
    
    displaySuggestion(prioritizedSubjects, dailyHours, breakInterval);
}

/**
 * Display AI suggestions in the UI
 * @param {Array} subjects - Suggested subjects
 * @param {number} hours - Daily study hours
 * @param {string} breakInterval - Break interval suggestion
 */
function displaySuggestion(subjects, hours, breakInterval) {
    document.getElementById('suggestionCard').style.display = 'block';
    
    // Display subjects
    document.getElementById('suggestedSubjects').innerHTML = subjects.map(subject => 
        `<div class="subject-tag">📚 ${subject}</div>`
    ).join('');
    
    // Display hours
    document.getElementById('suggestedHours').innerHTML = `
        <div class="hour-item">⏱️ ${hours} hours per day</div>
        <div class="hour-item">📊 ${hours * 7} hours per week</div>
    `;
    
    // Display breaks
    const [studyTime, breakTime] = breakInterval.split('-');
    document.getElementById('suggestedBreaks').innerHTML = `
        <div class="break-item">☕ ${studyTime} min study → ${breakTime} min break</div>
        <div class="break-item">💪 Take a 30-min break every 3 sessions</div>
    `;
    
    // Scroll to suggestions
    document.getElementById('suggestions').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// TIMETABLE MANAGEMENT
// ========================================

let currentSelectedDay = 'Mon';

/**
 * Select a day in the timetable
 * @param {string} day - Day of the week
 */
function selectDay(day) {
    currentSelectedDay = day;
    
    // Update active state
    document.querySelectorAll('.day-cell').forEach(cell => {
        cell.classList.remove('active');
    });
    event.target.classList.add('active');
}

/**
 * Render the weekly timetable
 */
function renderTimetable() {
    const grid = document.getElementById('timetableGrid');
    const timetable = loadTimetable();
    
    const hours = [];
    for (let i = 8; i <= 22; i++) {
        hours.push(i);
    }
    
    let html = '';
    
    // Render time labels and subjects for each hour
    hours.forEach(hour => {
        html += `<div class="time-block time-label">${hour}:00</div>`;
        
        ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
            const subject = timetable[day][hour];
            if (subject) {
                html += `
                    <div class="time-block">
                        <div class="subject-block" onclick="removeSubjectFromTimetable('${day}', ${hour})">
                            ${subject}
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="time-block" onclick="addSubjectToTimetable('${day}', ${hour})">
                        + Add
                    </div>
                `;
            }
        });
    });
    
    grid.innerHTML = html;
}

/**
 * Add subject to timetable slot
 * @param {string} day - Day of the week
 * @param {number} hour - Hour of the day
 */
function addSubjectToTimetable(day, hour) {
    const subject = prompt('Enter subject name:');
    if (subject && subject.trim()) {
        const timetable = loadTimetable();
        timetable[day][hour] = subject.trim();
        saveTimetable(timetable);
        renderTimetable();
    }
}

/**
 * Remove subject from timetable slot
 * @param {string} day - Day of the week
 * @param {number} hour - Hour of the day
 */
function removeSubjectFromTimetable(day, hour) {
    if (confirm('Remove this subject?')) {
        const timetable = loadTimetable();
        timetable[day][hour] = '';
        saveTimetable(timetable);
        renderTimetable();
    }
}

// ========================================
// NAVIGATION & SCROLLING
// ========================================

/**
 * Smooth scroll to section
 * @param {string} sectionId - ID of section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ========================================
// MODAL MANAGEMENT
// ========================================

/**
 * Close modal when clicking outside content
 */
document.addEventListener('click', function(event) {
    const modal = document.getElementById('taskModal');
    if (event.target === modal) {
        closeTaskModal();
    }
});

/**
 * Close modal with Escape key
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeTaskModal();
    }
});

// ========================================
// SEARCH/FILTER
// ========================================

/**
 * Filter tasks on input
 */
if (document.getElementById('taskFilter')) {
    document.getElementById('taskFilter').addEventListener('input', renderTasks);
}

// ========================================
// INITIALIZATION
// ========================================

/**
 * Initialize app on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    const tasks = loadTasks();
    const timetable = loadTimetable();
    
    // Render components
    renderTasks();
    renderTimetable();
    updateDashboard();

    // Reveal sections on scroll for polished entrance animations
    setupScrollReveal();
    
    // Set initial active day
    const dayCell = document.querySelector('.day-cell');
    if (dayCell) {
        dayCell.classList.add('active');
    }
    
    // Initialize sample data if empty
    if (tasks.length === 0) {
        initializeSampleData();
    }
});

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

/**
 * Add IntersectionObserver to reveal sections smoothly on scroll
 */
function setupScrollReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.reveal-on-scroll').forEach(section => {
        observer.observe(section);
    });
}

/**
 * Initialize with sample data for demonstration
 */
function initializeSampleData() {
    const sampleTasks = [
        {
            id: Date.now() + 1,
            title: 'Web Technology lab prep',
            subject: 'Web Technology',
            duration: 2,
            priority: 'high',
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'HTML5 semantics + responsive grid showcase',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 2,
            title: 'Theory of Computation proofs',
            subject: 'Theory of Computation',
            duration: 1.5,
            priority: 'medium',
            deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'Pumping lemma examples for CFLs',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 3,
            title: 'CN routing revision',
            subject: 'Computer Networks',
            duration: 2,
            priority: 'high',
            deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'OSPF vs BGP quick notes',
            completed: true,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 4,
            title: 'AI mini-project polishing',
            subject: 'Artificial Intelligence',
            duration: 3,
            priority: 'high',
            deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'Heuristics + evaluation demo for expo',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 5,
            title: 'Research methodology notes',
            subject: 'Research & Methodologies',
            duration: 1.5,
            priority: 'medium',
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'Problem statements + literature grid',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + 6,
            title: 'Software Engineering SRS review',
            subject: 'Software Engineering',
            duration: 2,
            priority: 'medium',
            deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            description: 'Use case diagrams + test plan draft',
            completed: false,
            createdAt: new Date().toISOString()
        }
    ];
    
    localStorage.setItem('studyTasks', JSON.stringify(sampleTasks));
    renderTasks();
    updateDashboard();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Format date to readable string
 * @param {string} dateStr - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

/**
 * Get time until deadline
 * @param {string} deadline - ISO date string
 * @returns {string} Time remaining description
 */
function getTimeUntilDeadline(deadline) {
    if (!deadline) return '';
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate - now;
    
    if (diff < 0) return 'Overdue';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 1) return `${days} days left`;
    if (days === 1) return '1 day left';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours}h left`;
}

// ========================================
// MOBILE MENU HANDLING
// ========================================

/**
 * Toggle mobile menu
 */
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = 'none';
    });
});
