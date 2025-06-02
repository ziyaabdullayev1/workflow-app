# Workflow Editor

A powerful, web-based workflow automation interface built with Next.js and React Flow, similar to n8n. Create, edit, and manage complex workflows with an intuitive drag-and-drop interface.

![Workflow Editor Screenshot](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 Core Functionality
- **Visual Workflow Builder**: Intuitive drag-and-drop interface for creating workflows
- **Node-Based Editor**: Connect different action nodes to build complex automation flows
- **Real-time Editing**: Live updates as you build and modify your workflows

### 🛠️ Advanced Features
- **Undo/Redo System**: Full history management with keyboard shortcuts (Ctrl+Z, Ctrl+Shift+Z)
- **Node Categories**: Organized node types across different categories
  - **Flow Control**: Wait, Conditional logic
  - **Communication**: Email, Chat, Phone calls
  - **Integration**: HTTP requests, API calls
  - **Programming**: Custom code execution
  - **Media**: Video processing
  - **Data**: Document processing

### 🎨 User Interface
- **Modern Design**: Clean, professional interface built with Tailwind CSS
- **Search & Filter**: Quickly find nodes with search and category filtering
- **Mini-map Navigation**: Overview of large workflows with color-coded nodes
- **Configuration Panel**: Detailed settings for each node type
- **Responsive Layout**: Works on desktop and tablet devices

### ⌨️ Keyboard Shortcuts
- `Ctrl+Z` - Undo last action
- `Ctrl+Shift+Z` - Redo action
- `Ctrl+S` - Save workflow
- `Delete/Backspace` - Delete selected nodes/edges
- `Click + Drag` - Pan around the canvas
- `Mouse Wheel` - Zoom in/out

### 💾 Data Management
- **Save/Load**: Persist workflows to localStorage and export as JSON
- **Auto-download**: Automatic file download when saving
- **Version Control**: Timestamped saves with version tracking
- **Import/Export**: JSON format for easy sharing and backup

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ziyaabdullayev1/workflow-app.git
   cd workflow-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Creating Your First Workflow

1. **Add Nodes**: Click the "+" button in the toolbar to open the node selector
2. **Search & Select**: Use the search bar or browse categories to find the node you need
3. **Connect Nodes**: Drag from one node's output handle to another node's input handle
4. **Configure Nodes**: Click on any node to open its configuration panel
5. **Save Your Work**: Use Ctrl+S or the Save button to download your workflow

### Node Types

#### Flow Control
- **Wait**: Pause execution for a specified duration
- **Conditional**: Branch workflow based on conditions

#### Communication
- **Email**: Send email notifications
- **Call**: Make API calls or phone calls
- **Chat**: Send messages to chat platforms

#### Integration
- **HTTP**: Make HTTP requests to external services
- **API**: Connect to various APIs

#### Programming
- **Code**: Execute custom JavaScript code
- **Transform**: Process and transform data

#### Media & Data
- **Video**: Process video content
- **Document**: Handle document processing

### Workflow Management

- **Saving**: Workflows are automatically saved to localStorage and can be exported as JSON files
- **Loading**: Previously saved workflows can be loaded from localStorage
- **Clearing**: Use the Clear button to start fresh
- **Deleting**: Select nodes/edges and press Delete key or use the toolbar button

## 🏗️ Architecture

### Tech Stack
- **Frontend Framework**: Next.js 15.3.3 with App Router
- **UI Library**: React 19.0.0
- **Workflow Engine**: React Flow 11.11.4
- **Styling**: Tailwind CSS 3.x
- **Icons**: Heroicons
- **Language**: TypeScript 5.x

### Project Structure
```
workflow-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   └── components/            # React components
│       ├── nodes/             # Custom node components
│       │   └── CustomNode.tsx # Base node component
│       ├── NodeConfigPanel.tsx # Node configuration
│       ├── NodeSelector.tsx   # Node selection modal
│       ├── Toolbar.tsx        # Left sidebar toolbar
│       ├── TopBar.tsx         # Top navigation bar
│       └── WorkflowEditor.tsx # Main editor component
├── public/                    # Static assets
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies and scripts
```

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Node Types

1. **Define the node type** in `NodeSelector.tsx`:
   ```typescript
   {
     type: 'YourNodeType',
     category: 'YourCategory',
     description: 'Your node description',
     icon: YourIcon,
   }
   ```

2. **Add configuration** in `NodeConfigPanel.tsx`:
   ```typescript
   YourNodeType: {
     setting1: 'default value',
     setting2: false,
   }
   ```

3. **Add color mapping** in `WorkflowEditor.tsx`:
   ```typescript
   case 'YourNodeType':
     return '#your-color';
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) - For the excellent flow diagram library
- [Next.js](https://nextjs.org/) - For the React framework
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Heroicons](https://heroicons.com/) - For the beautiful icon set
- [n8n](https://n8n.io/) - For the inspiration and workflow automation concepts

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

## 🔮 Roadmap



---

**Built with ❤️ by [Ziya Abdullayev](https://github.com/ziyaabdullayev1)**
