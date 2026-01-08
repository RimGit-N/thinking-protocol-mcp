#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Thinking Protocol Configuration
const THINKING_PROTOCOL = {
    version: "1.1",
    scope: "global",
    mode: "strict",
    execution: {
        ordered: true,
        allow_skip: false,
        require_all_keys: true,
    },
    flow: [
        {
            stage: "observe",
            description: "capture objective inputs only",
            keys: ["facts", "signals", "state"],
        },
        {
            stage: "analyze",
            description: "derive meaning and context",
            keys: ["patterns", "assumptions", "context"],
        },
        {
            stage: "root",
            description: "identify true underlying cause",
            keys: ["primary_cause", "supporting_factors", "core_issue"],
        },
        {
            stage: "act",
            description: "define actionable decisions",
            keys: ["main_action", "alternatives_risks", "execution_priority"],
        },
        {
            stage: "validate",
            description: "verify outcome and correctness",
            keys: ["success_metrics", "failure_signs", "evaluation_method"],
        },
        {
            stage: "improve",
            description: "prevent recurrence and strengthen system",
            keys: ["system_change", "rules_sop", "long_term_prevention"],
        },
    ],
};

// State management
let currentSession = {
    id: null,
    stages: {},
    currentStage: null,
    completed: false,
};

// Create MCP Server
const server = new Server(
    {
        name: "thinking-protocol-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

// Tool: Start new thinking session
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "thinking_start_session",
                description:
                    "Start a new thinking protocol session for complex problem-solving. Returns a session ID to track progress through the 6 stages.",
                inputSchema: {
                    type: "object",
                    properties: {
                        task_description: {
                            type: "string",
                            description: "Description of the task or problem to solve",
                        },
                    },
                    required: ["task_description"],
                },
            },
            {
                name: "thinking_execute_stage",
                description:
                    "Execute a specific stage of the thinking protocol. Stages must be executed in order: observe → analyze → root → act → validate → improve",
                inputSchema: {
                    type: "object",
                    properties: {
                        session_id: {
                            type: "string",
                            description: "Session ID from thinking_start_session",
                        },
                        stage: {
                            type: "string",
                            enum: ["observe", "analyze", "root", "act", "validate", "improve"],
                            description: "Stage to execute",
                        },
                        data: {
                            type: "object",
                            description:
                                "Stage data with required keys. Each stage has specific required keys - check protocol documentation.",
                            properties: {
                                facts: { type: "string" },
                                signals: { type: "string" },
                                state: { type: "string" },
                                patterns: { type: "string" },
                                assumptions: { type: "string" },
                                context: { type: "string" },
                                primary_cause: { type: "string" },
                                supporting_factors: { type: "string" },
                                core_issue: { type: "string" },
                                main_action: { type: "string" },
                                alternatives_risks: { type: "string" },
                                execution_priority: { type: "string" },
                                success_metrics: { type: "string" },
                                failure_signs: { type: "string" },
                                evaluation_method: { type: "string" },
                                system_change: { type: "string" },
                                rules_sop: { type: "string" },
                                long_term_prevention: { type: "string" },
                            },
                        },
                    },
                    required: ["session_id", "stage", "data"],
                },
            },
            {
                name: "thinking_get_status",
                description:
                    "Get current status of a thinking session including completed stages and next required stage",
                inputSchema: {
                    type: "object",
                    properties: {
                        session_id: {
                            type: "string",
                            description: "Session ID to check",
                        },
                    },
                    required: ["session_id"],
                },
            },
            {
                name: "thinking_get_protocol",
                description:
                    "Get the complete thinking protocol configuration including all stages and their required keys",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
            {
                name: "thinking_validate_session",
                description:
                    "Validate if all stages have been completed correctly with all required keys filled",
                inputSchema: {
                    type: "object",
                    properties: {
                        session_id: {
                            type: "string",
                            description: "Session ID to validate",
                        },
                    },
                    required: ["session_id"],
                },
            },
        ],
    };
});

// Tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        switch (name) {
            case "thinking_start_session": {
                const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                currentSession = {
                    id: sessionId,
                    task: args.task_description,
                    stages: {},
                    currentStage: null,
                    completed: false,
                    startedAt: new Date().toISOString(),
                };

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(
                                {
                                    success: true,
                                    session_id: sessionId,
                                    task: args.task_description,
                                    message: "Thinking session started. Begin with 'observe' stage.",
                                    next_stage: "observe",
                                    protocol: THINKING_PROTOCOL,
                                },
                                null,
                                2
                            ),
                        },
                    ],
                };
            }

            case "thinking_execute_stage": {
                const { session_id, stage, data } = args;

                // Validate session
                if (currentSession.id !== session_id) {
                    throw new Error(`Invalid session ID: ${session_id}`);
                }

                if (currentSession.completed) {
                    throw new Error("Session already completed");
                }

                // Find stage config
                const stageIndex = THINKING_PROTOCOL.flow.findIndex(
                    (s) => s.stage === stage
                );
                if (stageIndex === -1) {
                    throw new Error(`Invalid stage: ${stage}`);
                }

                const stageConfig = THINKING_PROTOCOL.flow[stageIndex];

                // Validate ordering (strict mode)
                if (THINKING_PROTOCOL.execution.ordered) {
                    const completedStages = Object.keys(currentSession.stages).length;
                    if (stageIndex !== completedStages) {
                        const expectedStage = THINKING_PROTOCOL.flow[completedStages]?.stage;
                        throw new Error(
                            `Stage order violation. Expected '${expectedStage}', got '${stage}'`
                        );
                    }
                }

                // Validate required keys
                if (THINKING_PROTOCOL.execution.require_all_keys) {
                    const missingKeys = stageConfig.keys.filter((key) => !data[key]);
                    if (missingKeys.length > 0) {
                        throw new Error(
                            `Missing required keys for stage '${stage}': ${missingKeys.join(", ")}`
                        );
                    }
                }

                // Store stage data
                currentSession.stages[stage] = {
                    data,
                    completedAt: new Date().toISOString(),
                };
                currentSession.currentStage = stage;

                // Check if session is complete
                const allStagesCompleted =
                    Object.keys(currentSession.stages).length ===
                    THINKING_PROTOCOL.flow.length;
                if (allStagesCompleted) {
                    currentSession.completed = true;
                }

                const nextStageIndex = stageIndex + 1;
                const nextStage =
                    nextStageIndex < THINKING_PROTOCOL.flow.length
                        ? THINKING_PROTOCOL.flow[nextStageIndex].stage
                        : null;

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(
                                {
                                    success: true,
                                    session_id,
                                    completed_stage: stage,
                                    next_stage: nextStage,
                                    session_completed: currentSession.completed,
                                    progress: `${Object.keys(currentSession.stages).length}/${THINKING_PROTOCOL.flow.length}`,
                                    message: currentSession.completed
                                        ? "🎉 All stages completed! Session finished."
                                        : `Stage '${stage}' completed. Next: '${nextStage}'`,
                                },
                                null,
                                2
                            ),
                        },
                    ],
                };
            }

            case "thinking_get_status": {
                const { session_id } = args;

                if (currentSession.id !== session_id) {
                    throw new Error(`Invalid session ID: ${session_id}`);
                }

                const completedStages = Object.keys(currentSession.stages);
                const nextStageIndex = completedStages.length;
                const nextStage =
                    nextStageIndex < THINKING_PROTOCOL.flow.length
                        ? THINKING_PROTOCOL.flow[nextStageIndex]
                        : null;

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(
                                {
                                    session_id,
                                    task: currentSession.task,
                                    completed_stages: completedStages,
                                    current_stage: currentSession.currentStage,
                                    next_stage: nextStage?.stage || null,
                                    next_stage_keys: nextStage?.keys || null,
                                    progress: `${completedStages.length}/${THINKING_PROTOCOL.flow.length}`,
                                    completed: currentSession.completed,
                                    started_at: currentSession.startedAt,
                                },
                                null,
                                2
                            ),
                        },
                    ],
                };
            }

            case "thinking_get_protocol": {
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(THINKING_PROTOCOL, null, 2),
                        },
                    ],
                };
            }

            case "thinking_validate_session": {
                const { session_id } = args;

                if (currentSession.id !== session_id) {
                    throw new Error(`Invalid session ID: ${session_id}`);
                }

                const validationResults = [];
                let isValid = true;

                // Check each stage
                for (const stageConfig of THINKING_PROTOCOL.flow) {
                    const stageData = currentSession.stages[stageConfig.stage];

                    if (!stageData) {
                        validationResults.push({
                            stage: stageConfig.stage,
                            valid: false,
                            error: "Stage not completed",
                        });
                        isValid = false;
                        continue;
                    }

                    // Check required keys
                    const missingKeys = stageConfig.keys.filter(
                        (key) => !stageData.data[key]
                    );

                    if (missingKeys.length > 0) {
                        validationResults.push({
                            stage: stageConfig.stage,
                            valid: false,
                            error: `Missing keys: ${missingKeys.join(", ")}`,
                        });
                        isValid = false;
                    } else {
                        validationResults.push({
                            stage: stageConfig.stage,
                            valid: true,
                        });
                    }
                }

                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(
                                {
                                    session_id,
                                    valid: isValid,
                                    validation_results: validationResults,
                                    message: isValid
                                        ? "✅ Session is valid - all stages completed with required keys"
                                        : "❌ Session validation failed - see validation_results for details",
                                },
                                null,
                                2
                            ),
                        },
                    ],
                };
            }

            default:
                throw new Error(`Unknown tool: ${name}`);
        }
    } catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(
                        {
                            success: false,
                            error: error.message,
                        },
                        null,
                        2
                    ),
                },
            ],
            isError: true,
        };
    }
});

// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Thinking Protocol MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
