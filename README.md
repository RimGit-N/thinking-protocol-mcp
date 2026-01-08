# Thinking Protocol MCP Server

[![npm version](https://img.shields.io/npm/v/thinking-protocol-mcp.svg?style=flat-square)](https://www.npmjs.com/package/thinking-protocol-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/RimGit-N/thinking-protocol-mcp.svg?style=flat-square)](https://github.com/RimGit-N/thinking-protocol-mcp/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/RimGit-N/thinking-protocol-mcp.svg?style=flat-square)](https://github.com/RimGit-N/thinking-protocol-mcp/issues)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg?style=flat-square)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-blue.svg?style=flat-square)](https://modelcontextprotocol.io/)

A Model Context Protocol (MCP) server that implements a structured 6-stage thinking framework for systematic problem-solving and decision-making.

## 🎯 Overview

This MCP server provides tools to guide AI agents through a rigorous thinking process with 6 mandatory stages:

1. **OBSERVE** - Capture objective inputs only
2. **ANALYZE** - Derive meaning and context
3. **ROOT** - Identify true underlying cause
4. **ACT** - Define actionable decisions
5. **VALIDATE** - Verify outcome and correctness
6. **IMPROVE** - Prevent recurrence and strengthen system

## 🚀 Installation

### Option 1: Via NPM (Recommended - After Publishing)

```bash
npm install -g thinking-protocol-mcp
```

### Option 2: From GitHub

```bash
git clone https://github.com/RimGit-N/thinking-protocol-mcp.git
cd thinking-protocol-mcp
npm install
```

### Option 3: Via NPX (No Installation Required)

```bash
npx -y thinking-protocol-mcp
```

## 🔧 Configuration

Add to your MCP configuration file (e.g., `mcp_config.json` or Claude Desktop config):

### Using NPX (Recommended)

```json
{
  "mcpServers": {
    "thinking-protocol": {
      "command": "npx",
      "args": [
        "-y",
        "thinking-protocol-mcp"
      ]
    }
  }
}
```

### Using Global Installation

```json
{
  "mcpServers": {
    "thinking-protocol": {
      "command": "thinking-protocol-mcp",
      "args": []
    }
  }
}
```

### Using Local Clone

```json
{
  "mcpServers": {
    "thinking-protocol": {
      "command": "node",
      "args": [
        "/absolute/path/to/thinking-protocol-mcp/index.js"
      ]
    }
  }
}
```

### Complete Example with Multiple MCP Servers

If you're using multiple MCP servers together:

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp"
      ]
    },
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "@upstash/context7-mcp"
      ]
    },
    "thinking-protocol": {
      "command": "npx",
      "args": [
        "-y",
        "thinking-protocol-mcp"
      ]
    }
  }
}
```

**Note**: Make sure there's a comma (`,`) between each server entry, except after the last one.

## 🛠️ Available Tools

### 1. `thinking_start_session`

Start a new thinking protocol session.

**Input:**
```json
{
  "task_description": "Description of the problem to solve"
}
```

**Output:**
```json
{
  "success": true,
  "session_id": "session_1234567890_abc123",
  "next_stage": "observe",
  "protocol": { ... }
}
```

### 2. `thinking_execute_stage`

Execute a specific stage of the protocol.

**Input:**
```json
{
  "session_id": "session_1234567890_abc123",
  "stage": "observe",
  "data": {
    "facts": "Factual data...",
    "signals": "Important indicators...",
    "state": "Current system state..."
  }
}
```

**Stage Requirements:**

| Stage | Required Keys |
|-------|--------------|
| observe | `facts`, `signals`, `state` |
| analyze | `patterns`, `assumptions`, `context` |
| root | `primary_cause`, `supporting_factors`, `core_issue` |
| act | `main_action`, `alternatives_risks`, `execution_priority` |
| validate | `success_metrics`, `failure_signs`, `evaluation_method` |
| improve | `system_change`, `rules_sop`, `long_term_prevention` |

### 3. `thinking_get_status`

Get current status of a thinking session.

**Input:**
```json
{
  "session_id": "session_1234567890_abc123"
}
```

### 4. `thinking_get_protocol`

Get the complete protocol configuration.

**Input:**
```json
{}
```

### 5. `thinking_validate_session`

Validate if all stages are completed correctly.

**Input:**
```json
{
  "session_id": "session_1234567890_abc123"
}
```

## 📋 Usage Example

```javascript
// 1. Start session
const session = await thinking_start_session({
  task_description: "Optimize database query performance"
});

// 2. Execute OBSERVE stage
await thinking_execute_stage({
  session_id: session.session_id,
  stage: "observe",
  data: {
    facts: "Query takes 5 seconds, 10M rows, no indexes",
    signals: "CPU usage spikes to 100% during query",
    state: "Production database, peak hours"
  }
});

// 3. Execute ANALYZE stage
await thinking_execute_stage({
  session_id: session.session_id,
  stage: "analyze",
  data: {
    patterns: "Full table scans on large dataset",
    assumptions: "No proper indexing strategy",
    context: "Legacy system, no recent optimization"
  }
});

// ... continue with remaining stages

// 6. Validate session
const validation = await thinking_validate_session({
  session_id: session.session_id
});
```

## 🔒 Execution Rules

- **Mode**: STRICT - All stages must be completed
- **Ordered**: TRUE - Stages must be executed in sequence
- **Allow Skip**: FALSE - Cannot skip any stage
- **Require All Keys**: TRUE - All required keys must be filled

## 🎓 When to Use

**Mandatory for:**
- ✅ Complex problem-solving
- ✅ Root cause analysis
- ✅ Architectural decisions
- ✅ Security analysis
- ✅ Performance optimization

**Optional for:**
- ⚪ Simple, straightforward tasks
- ⚪ Routine operations

## 📄 License

MIT

## 👤 Author

Rimuru
