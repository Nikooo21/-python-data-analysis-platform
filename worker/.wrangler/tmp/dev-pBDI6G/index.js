var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// index.js
var index_default = {
  async fetch(request, env) {
    if (request.method === "GET") {
      return handleGetRequest(request, env);
    }
    if (request.method === "POST") {
      return handlePostRequest(request, env);
    }
    if (request.method === "PUT") {
      return handlePutRequest(request, env);
    }
    return new Response("Method Not Allowed", { status: 405 });
  }
};
async function handleGetRequest(request, env) {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    if (path.startsWith("/api/projects")) {
      return await getProjectsData(env);
    } else if (path.startsWith("/api/ai-prompts")) {
      return await getAIPrompts(env);
    } else if (path.startsWith("/api/thinking-models")) {
      return await getThinkingModels(env);
    }
    return new Response("Not Found", { status: 404 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "\u8BFB\u53D6\u6570\u636E\u5931\u8D25" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(handleGetRequest, "handleGetRequest");
async function handlePutRequest(request, env) {
  try {
    const url = new URL(request.url);
    const path = url.pathname;
    const body = await request.json();
    if (path.startsWith("/api/projects")) {
      await env.PROJECT_DATA.put("projects", JSON.stringify(body));
      return new Response(JSON.stringify({ success: true, message: "\u9879\u76EE\u6570\u636E\u5DF2\u66F4\u65B0" }), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (path.startsWith("/api/ai-prompts")) {
      await env.PROJECT_DATA.put("ai_prompts", JSON.stringify(body));
      return new Response(JSON.stringify({ success: true, message: "AI\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0" }), {
        headers: { "Content-Type": "application/json" }
      });
    } else if (path.startsWith("/api/thinking-models")) {
      await env.PROJECT_DATA.put("thinking_models", JSON.stringify(body));
      return new Response(JSON.stringify({ success: true, message: "\u601D\u7EF4\u6A21\u578B\u5DF2\u66F4\u65B0" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response("Not Found", { status: 404 });
  } catch (error) {
    console.error("\u5199\u5165\u6570\u636E\u5931\u8D25:", error);
    return new Response(JSON.stringify({ error: "\u5199\u5165\u6570\u636E\u5931\u8D25" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(handlePutRequest, "handlePutRequest");
async function handlePostRequest(request, env) {
  try {
    const { messages } = await request.json();
    const systemPrompt = {
      role: "system",
      content: `\u4F60\u662F\u4E00\u4E2A\u4E25\u683C\u7684Python\u6570\u636E\u5206\u6790\u6559\u7EC3\uFF0C\u4F60\u7684\u4EFB\u52A1\u662F\u5E2E\u52A9\u7528\u6237\u901A\u8FC7\u5B9E\u64CD\u9879\u76EE\u5B66\u4E60\u6570\u636E\u5206\u6790\uFF0C\u800C\u4E0D\u662F\u66FF\u4ED6\u4EEC\u5199\u4EE3\u7801\u3002
1. \u6C38\u8FDC\u4E0D\u8981\u76F4\u63A5\u7ED9\u7528\u6237\u5B8C\u6574\u7684\u53EF\u8FD0\u884C\u4EE3\u7801\uFF0C\u53EA\u7ED9\u601D\u8DEF\u548C\u5173\u952E\u4EE3\u7801\u7247\u6BB5\uFF1B
2. \u5F53\u7528\u6237\u4EE3\u7801\u62A5\u9519\u65F6\uFF0C\u5148\u6307\u51FA\u9519\u8BEF\u539F\u56E0\uFF0C\u518D\u544A\u8BC9\u4ED6\u4EEC\u5E94\u8BE5\u600E\u4E48\u6539\uFF0C\u4E0D\u8981\u76F4\u63A5\u8D34\u4FEE\u6B63\u540E\u7684\u4EE3\u7801\uFF1B
3. \u5F53\u7528\u6237\u8BF4"\u6211\u5361\u4F4F\u4E86"\u65F6\uFF0C\u7ED9\u4ED6\u4EEC\u4E00\u4E2A\u4E0B\u4E00\u6B65\u7684\u63D0\u793A\uFF0C\u5F15\u5BFC\u4ED6\u4EEC\u81EA\u5DF1\u601D\u8003\uFF1B
4. \u5F53\u7528\u6237\u7B54\u9519\u9898\u76EE\u65F6\uFF0C\u4E00\u5B9A\u8981\u5148\u8FFD\u95EE\uFF1A"\u4F60\u54EA\u91CC\u9519\u4E86\uFF1F\u6F0F\u6389\u4E86\u4EC0\u4E48\uFF1F"\uFF0C\u7136\u540E\u518D\u8BE6\u7EC6\u89E3\u91CA\uFF1B
5. \u59CB\u7EC8\u5F3A\u8C03\u601D\u7EF4\u7684\u91CD\u8981\u6027\uFF0C\u800C\u4E0D\u662F\u8BED\u6CD5\u7684\u6B63\u786E\u6027\uFF1B
6. \u8BED\u8A00\u8981\u7B80\u6D01\u3001\u76F4\u767D\u3001\u4E25\u5389\uFF0C\u4E0D\u8981\u592A\u5BA2\u6C14\u3002`
    };
    const aiResponse = await fetch(
      `https://gateway.ai.cloudflare.com/v1/${env.CLOUDFLARE_ACCOUNT_ID}/${env.AI_GATEWAY_NAME}/openai/chat/completions`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.AI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          // 轻量模型，适配免费额度
          messages: [systemPrompt, ...messages],
          temperature: 0.7,
          max_tokens: 500
        })
      }
    );
    return new Response(aiResponse.body, {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "AI\u8BF7\u6C42\u5931\u8D25" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(handlePostRequest, "handlePostRequest");
async function getProjectsData(env) {
  try {
    const projectsData = await env.PROJECT_DATA.get("projects", { type: "json" });
    if (projectsData) {
      return new Response(JSON.stringify(projectsData), {
        headers: { "Content-Type": "application/json" }
      });
    }
    const defaultProjects = getDefaultProjects();
    return new Response(JSON.stringify(defaultProjects), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("\u83B7\u53D6\u9879\u76EE\u6570\u636E\u5931\u8D25:", error);
    return new Response(JSON.stringify({ error: "\u83B7\u53D6\u9879\u76EE\u6570\u636E\u5931\u8D25" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(getProjectsData, "getProjectsData");
async function getAIPrompts(env) {
  try {
    const promptsData = await env.PROJECT_DATA.get("ai_prompts", { type: "json" });
    if (promptsData) {
      return new Response(JSON.stringify(promptsData), {
        headers: { "Content-Type": "application/json" }
      });
    }
    const defaultPrompts = getDefaultAIPrompts();
    return new Response(JSON.stringify(defaultPrompts), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("\u83B7\u53D6AI\u63D0\u793A\u8BCD\u5931\u8D25:", error);
    return new Response(JSON.stringify({ error: "\u83B7\u53D6AI\u63D0\u793A\u8BCD\u5931\u8D25" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(getAIPrompts, "getAIPrompts");
async function getThinkingModels(env) {
  try {
    const modelsData = await env.PROJECT_DATA.get("thinking_models", { type: "json" });
    if (modelsData) {
      return new Response(JSON.stringify(modelsData), {
        headers: { "Content-Type": "application/json" }
      });
    }
    const defaultModels = getDefaultThinkingModels();
    return new Response(JSON.stringify(defaultModels), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("\u83B7\u53D6\u601D\u7EF4\u6A21\u578B\u5931\u8D25:", error);
    return new Response(JSON.stringify({ error: "\u83B7\u53D6\u601D\u7EF4\u6A21\u578B\u5931\u8D25" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(getThinkingModels, "getThinkingModels");
function getDefaultProjects() {
  return [
    {
      id: "project-1",
      title: "\u6570\u636E\u53EF\u89C6\u5316\u57FA\u7840",
      description: "\u5B66\u4E60\u4F7F\u7528Matplotlib\u548CSeaborn\u521B\u5EFA\u57FA\u672C\u56FE\u8868",
      difficulty: "beginner",
      tasks: [
        "\u521B\u5EFA\u6298\u7EBF\u56FE\u5C55\u793A\u65F6\u95F4\u5E8F\u5217\u6570\u636E",
        "\u4F7F\u7528\u67F1\u72B6\u56FE\u6BD4\u8F83\u4E0D\u540C\u7C7B\u522B\u7684\u6570\u636E",
        "\u7ED8\u5236\u6563\u70B9\u56FE\u5206\u6790\u4E24\u4E2A\u53D8\u91CF\u7684\u5173\u7CFB"
      ]
    },
    {
      id: "project-2",
      title: "\u6570\u636E\u6E05\u6D17\u4E0E\u9884\u5904\u7406",
      description: "\u5B66\u4E60\u5904\u7406\u7F3A\u5931\u503C\u3001\u5F02\u5E38\u503C\u548C\u91CD\u590D\u6570\u636E",
      difficulty: "intermediate",
      tasks: [
        "\u8BC6\u522B\u5E76\u5904\u7406\u7F3A\u5931\u503C",
        "\u68C0\u6D4B\u548C\u5904\u7406\u5F02\u5E38\u503C",
        "\u79FB\u9664\u91CD\u590D\u6570\u636E\u5E76\u6807\u51C6\u5316\u6570\u636E\u683C\u5F0F"
      ]
    },
    {
      id: "project-3",
      title: " exploratory\u6570\u636E\u5206\u6790",
      description: "\u5B66\u4E60\u4F7F\u7528\u7EDF\u8BA1\u65B9\u6CD5\u63A2\u7D22\u6570\u636E\u5206\u5E03\u548C\u7279\u5F81",
      difficulty: "intermediate",
      tasks: [
        "\u8BA1\u7B97\u57FA\u672C\u7EDF\u8BA1\u91CF\uFF08\u5747\u503C\u3001\u4E2D\u4F4D\u6570\u3001\u6807\u51C6\u5DEE\uFF09",
        "\u5206\u6790\u6570\u636E\u5206\u5E03\u548C\u504F\u5EA6",
        "\u8BC6\u522B\u6570\u636E\u4E2D\u7684\u6A21\u5F0F\u548C\u8D8B\u52BF"
      ]
    }
  ];
}
__name(getDefaultProjects, "getDefaultProjects");
function getDefaultAIPrompts() {
  return {
    system: `\u4F60\u662F\u4E00\u4E2A\u4E25\u683C\u7684Python\u6570\u636E\u5206\u6790\u6559\u7EC3\uFF0C\u4F60\u7684\u4EFB\u52A1\u662F\u5E2E\u52A9\u7528\u6237\u901A\u8FC7\u5B9E\u64CD\u9879\u76EE\u5B66\u4E60\u6570\u636E\u5206\u6790\uFF0C\u800C\u4E0D\u662F\u66FF\u4ED6\u4EEC\u5199\u4EE3\u7801\u3002
1. \u6C38\u8FDC\u4E0D\u8981\u76F4\u63A5\u7ED9\u7528\u6237\u5B8C\u6574\u7684\u53EF\u8FD0\u884C\u4EE3\u7801\uFF0C\u53EA\u7ED9\u601D\u8DEF\u548C\u5173\u952E\u4EE3\u7801\u7247\u6BB5\uFF1B
2. \u5F53\u7528\u6237\u4EE3\u7801\u62A5\u9519\u65F6\uFF0C\u5148\u6307\u51FA\u9519\u8BEF\u539F\u56E0\uFF0C\u518D\u544A\u8BC9\u4ED6\u4EEC\u5E94\u8BE5\u600E\u4E48\u6539\uFF0C\u4E0D\u8981\u76F4\u63A5\u8D34\u4FEE\u6B63\u540E\u7684\u4EE3\u7801\uFF1B
3. \u5F53\u7528\u6237\u8BF4"\u6211\u5361\u4F4F\u4E86"\u65F6\uFF0C\u7ED9\u4ED6\u4EEC\u4E00\u4E2A\u4E0B\u4E00\u6B65\u7684\u63D0\u793A\uFF0C\u5F15\u5BFC\u4ED6\u4EEC\u81EA\u5DF1\u601D\u8003\uFF1B
4. \u5F53\u7528\u6237\u7B54\u9519\u9898\u76EE\u65F6\uFF0C\u4E00\u5B9A\u8981\u5148\u8FFD\u95EE\uFF1A"\u4F60\u54EA\u91CC\u9519\u4E86\uFF1F\u6F0F\u6389\u4E86\u4EC0\u4E48\uFF1F"\uFF0C\u7136\u540E\u518D\u8BE6\u7EC6\u89E3\u91CA\uFF1B
5. \u59CB\u7EC8\u5F3A\u8C03\u601D\u7EF4\u7684\u91CD\u8981\u6027\uFF0C\u800C\u4E0D\u662F\u8BED\u6CD5\u7684\u6B63\u786E\u6027\uFF1B
6. \u8BED\u8A00\u8981\u7B80\u6D01\u3001\u76F4\u767D\u3001\u4E25\u5389\uFF0C\u4E0D\u8981\u592A\u5BA2\u6C14\u3002`,
    codeError: "\u8BF7\u5206\u6790\u4EE5\u4E0B\u4EE3\u7801\u9519\u8BEF\u5E76\u7ED9\u51FA\u4FEE\u590D\u5EFA\u8BAE\uFF0C\u4F46\u4E0D\u8981\u76F4\u63A5\u63D0\u4F9B\u5B8C\u6574\u4EE3\u7801\uFF1A",
    stuck: "\u7528\u6237\u5728\u9879\u76EE\u4E2D\u5361\u4F4F\u4E86\uFF0C\u8BF7\u7ED9\u51FA\u4E0B\u4E00\u6B65\u7684\u601D\u8DEF\u63D0\u793A\uFF0C\u5F15\u5BFC\u4ED6\u4EEC\u81EA\u5DF1\u601D\u8003\uFF1A",
    wrongAnswer: '\u7528\u6237\u7B54\u9519\u4E86\u9898\u76EE\uFF0C\u8BF7\u5148\u8FFD\u95EE"\u4F60\u54EA\u91CC\u9519\u4E86\uFF1F\u6F0F\u6389\u4E86\u4EC0\u4E48\uFF1F"\uFF0C\u7136\u540E\u518D\u8BE6\u7EC6\u89E3\u91CA\u6B63\u786E\u7B54\u6848\uFF1A'
  };
}
__name(getDefaultAIPrompts, "getDefaultAIPrompts");
function getDefaultThinkingModels() {
  return [
    {
      id: "model-1",
      title: "\u6570\u636E\u601D\u7EF4\u6A21\u578B",
      description: "\u4ECE\u6570\u636E\u6536\u96C6\u3001\u6E05\u6D17\u3001\u5206\u6790\u5230\u53EF\u89C6\u5316\u7684\u5B8C\u6574\u601D\u7EF4\u6D41\u7A0B",
      steps: [
        "\u660E\u786E\u95EE\u9898\u548C\u76EE\u6807",
        "\u6536\u96C6\u548C\u7406\u89E3\u6570\u636E",
        "\u6570\u636E\u6E05\u6D17\u548C\u9884\u5904\u7406",
        "\u63A2\u7D22\u6027\u6570\u636E\u5206\u6790",
        "\u6784\u5EFA\u6A21\u578B\u548C\u9A8C\u8BC1",
        "\u7ED3\u679C\u89E3\u91CA\u548C\u53EF\u89C6\u5316",
        "\u603B\u7ED3\u548C\u5EFA\u8BAE"
      ]
    },
    {
      id: "model-2",
      title: "\u7EDF\u8BA1\u601D\u7EF4\u6A21\u578B",
      description: "\u57FA\u4E8E\u7EDF\u8BA1\u65B9\u6CD5\u7684\u6570\u636E\u5206\u6790\u601D\u7EF4\u6846\u67B6",
      steps: [
        "\u63CF\u8FF0\u6027\u7EDF\u8BA1\u5206\u6790",
        "\u63A8\u65AD\u6027\u7EDF\u8BA1\u5206\u6790",
        "\u5047\u8BBE\u68C0\u9A8C",
        "\u76F8\u5173\u6027\u5206\u6790",
        "\u56DE\u5F52\u5206\u6790",
        "\u5B9E\u9A8C\u8BBE\u8BA1\u548CA/B\u6D4B\u8BD5"
      ]
    }
  ];
}
__name(getDefaultThinkingModels, "getDefaultThinkingModels");

// ../../root/.nvm/versions/node/v24.14.1/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../root/.nvm/versions/node/v24.14.1/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-4XGuxD/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = index_default;

// ../../root/.nvm/versions/node/v24.14.1/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-4XGuxD/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
