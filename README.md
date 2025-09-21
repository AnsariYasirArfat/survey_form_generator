
# Dynamic Survey Form Generator

A powerful Next.js application for creating dynamic surveys with advanced conditional logic capabilities. Build sophisticated survey forms that adapt based on user responses using an intuitive visual interface.

## 🎯 Project Mission

To provide a comprehensive survey building platform that enables users to create intelligent, dynamic forms with complex conditional logic, making surveys more engaging and data collection more efficient.

## ✨ Key Features

### 📝 **Survey Creation & Management**
- **Visual Survey Builder**: Intuitive interface for creating surveys
- **Question Management**: Add, edit, duplicate, and delete questions with ease
- **Survey Naming**: Custom survey titles and descriptions
- **Real-time Preview**: See changes instantly as you build

### 🔧 **Question Types Supported**
- **Single Input**: Text, number, email, password, range, date, time
- **Long Text**: Multi-line text areas for detailed responses
- **Radio Groups**: Single-choice questions with custom options
- **Checkboxes**: Multiple-choice questions with validation
- **Boolean**: Yes/No questions
- **Rating Scale**: Numeric or star-based rating systems

### 🧠 **Advanced Conditional Logic**
- **Dynamic Question Flow**: Questions appear based on previous answers
- **Logic Operators**: AND/OR operations for complex conditions
- **Comparison Operators**: Equals, not equals, contains, greater than, less than, etc.
- **Real-time Evaluation**: Logic is processed as users answer questions
- **Visual Logic Editor**: Easy-to-use interface for setting up conditions

### 👥 **Three User Modes**
- **Admin Mode** (`/design`): Create and configure surveys
- **Preview Mode** (`/preview`): Test surveys before publishing
- **User Mode** (`/usermode`): Clean interface for survey takers

### 💾 **Data Management**
- **Local Storage**: Survey data persists across browser sessions
- **JSON Export**: Complete survey structure can be exported
- **Real-time Sync**: Changes are automatically saved

## 🛠️ Technical Stack

- **Framework**: Next.js 14 with App Router
- **UI Library**: NextUI (modern React components)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context API
- **ID Generation**: UUID v4

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── design/                   # Survey builder interface
│   ├── preview/                  # Admin preview mode
│   ├── usermode/                 # End-user survey interface
│   ├── JSON/                     # JSON output view
│   ├── Context/                  # Global state management
│   └── layout.tsx                # Root layout
├── components/
│   ├── AdminSide/                # Admin interface components
│   │   ├── adminAnswerTypes/     # Question type components for admin
│   │   ├── ConditionalLogicEditor.tsx
│   │   ├── SurveyComposer.tsx
│   │   └── QuestionForm.tsx
│   ├── UserSide/                 # User interface components
│   │   ├── usersAnswerTypes/     # Question type components for users
│   │   ├── SurveyFormUsers.tsx
│   │   └── AdminPreview.tsx
│   └── NavigationBar.tsx           # Navigation component
├── types/
│   └── questions.ts              # TypeScript interfaces
├── utils/
│   └── answerTypesData.ts        # Question type configurations
└── style_module/                 # CSS modules
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnsariYasirArfat/survey_form_generator
   cd survey_form_generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Creating a Survey

1. **Start Building**: Click "Create Survey" on the homepage
2. **Name Your Survey**: Enter a descriptive title
3. **Add Questions**: Click "Add Questions" to create new questions
4. **Configure Questions**: 
   - Set question name and title
   - Choose question type from dropdown
   - Configure type-specific options
   - Mark as required if needed
5. **Set Up Logic**: Use the Logic Editor to create conditional flows
6. **Preview**: Test your survey in preview mode
7. **Export**: Generate JSON output for your survey

### Question Types Configuration

- **Single Input**: Choose input type (text, number, email, etc.)
- **Radio Groups**: Add/remove choice options
- **Checkboxes**: Configure multiple choice options with validation
- **Rating Scale**: Set rating count and type (numbers or stars)
- **Boolean**: Simple yes/no questions
- **Long Text**: Multi-line text input

### Conditional Logic Setup

1. **Select Target Question**: Choose which question to show/hide
2. **Set Conditions**: Define when the question should appear
3. **Choose Operators**: Select comparison and logic operators
4. **Test Logic**: Preview how the logic works in real-time

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Features in Detail

### Conditional Logic Engine
The application features a sophisticated logic evaluation system that:
- Processes complex AND/OR operations
- Supports multiple comparison types
- Dynamically queues questions based on user responses
- Provides real-time logic evaluation

### Question Management
- **Add Questions**: Create new questions with unique IDs
- **Duplicate Questions**: Copy existing questions with all configurations
- **Delete Questions**: Remove questions with automatic logic cleanup
- **Reorder Questions**: Visual question list with navigation

### Data Persistence
- **Automatic Saving**: All changes are saved to localStorage
- **Session Recovery**: Survey data persists across browser sessions
- **JSON Export**: Complete survey structure can be exported

## Key Components

### SurveyComposer
Main interface for survey creation with:
- Question list sidebar
- Survey name input
- Question configuration area

### ConditionalLogicEditor
Advanced logic setup with:
- Visual condition builder
- Multiple operator support
- Real-time validation

### SurveyFormUsers
User-facing survey interface with:
- Dynamic question queuing
- Logic evaluation engine
- Progress tracking

<!-- ## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices -->

## Data Security

- All data is stored locally in the browser
- No external data transmission
- Complete control over survey data

---

**Built with ❤️ using Next.js, TypeScript, and NextUI**
