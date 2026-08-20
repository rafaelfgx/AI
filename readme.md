# AI

![](https://repository-images.githubusercontent.com/1150063037/e6a330d0-4c6f-44bd-89a0-0428467a9a89)

## Concepts

### LLM Fundamentals

A Large Language Model (LLM) is a neural network trained primarily to process and generate sequences of tokens. Modern LLMs learn statistical relationships between tokens from very large datasets and use those relationships to predict what tokens are likely to come next given the preceding context.

At its core, an autoregressive LLM models a conditional probability distribution:

`P(next token | previous tokens)`

During training, the model receives token sequences and learns to minimize the difference between its predicted next-token distribution and the actual next token, typically using cross-entropy loss. This process adjusts billions of numerical parameters called weights.

An LLM does not store knowledge as a conventional database of facts. Information is distributed throughout its learned parameters as patterns and representations. Consequently, retrieving a fact from an LLM is fundamentally different from querying a database: the model generates a statistically plausible continuation rather than performing an exact record lookup.

Important concepts include:

- Parameters: learned numerical values that determine the model's behavior.
- Training: the process of adjusting parameters using large datasets.
- Pretraining: broad training, usually using next-token prediction or related objectives.
- Post-training: additional training used to improve instruction following, reasoning behavior, safety, and usefulness.
- Inference: running an already-trained model to generate outputs.
- Autoregressive generation: generating one token at a time while conditioning each new token on previous tokens.
- Foundation models: general-purpose models that can support many downstream tasks.
- Instruction-tuned models: models specifically trained to follow natural-language instructions.
- Reasoning models: models optimized to perform more extensive inference before producing an answer.

LLMs are probabilistic systems. They do not inherently guarantee truth, consistency, determinism, or compliance with external business rules. Reliable applications therefore usually combine LLMs with retrieval, tools, structured outputs, validation, evaluation, and guardrails.

### Transformers & Attention

The Transformer is the neural-network architecture underlying most modern LLMs. Unlike older recurrent architectures, Transformers process relationships between tokens primarily through an attention mechanism.

The central mechanism is self-attention. For every token representation, the model derives three vectors:

- Query (Q)
- Key (K)
- Value (V)

Attention scores are calculated from relationships between queries and keys. Conceptually:

`Attention(Q, K, V) = softmax(QKᵀ / √dₖ)V`

The resulting scores determine how strongly each token should incorporate information from other relevant tokens.

Transformers generally contain multiple attention heads. Multi-head attention allows different heads to learn different relationships simultaneously, such as syntactic relationships, positional relationships, semantic associations, or long-range dependencies.

Other important components include:

- Token embeddings, which convert token IDs into vectors.
- Positional information, which allows the model to distinguish token order.
- Feed-forward neural networks, which transform representations after attention.
- Residual connections, which help information and gradients propagate through deep networks.
- Normalization layers, which stabilize training.
- Multiple Transformer layers, which progressively construct more sophisticated representations.

Decoder-only Transformers, commonly used for generative LLMs, employ causal attention. A token can attend to previous tokens but not future tokens during autoregressive generation.

Attention is particularly important because its computation and memory requirements influence context-window size, inference cost, and latency.

### Tokenization

LLMs do not normally process text directly as words or characters. Text is first transformed into tokens by a tokenizer.

A token may represent:

- An entire word
- Part of a word
- Punctuation
- Whitespace
- A character
- A sequence of characters
- Special control symbols

For example, a tokenizer might represent `"unbelievable"` as one token or split it into several subword tokens.

Common tokenization approaches include Byte Pair Encoding (BPE), WordPiece, Unigram tokenization, and byte-level techniques.

Each token is mapped to an integer called a token ID. The model internally operates on these IDs and their corresponding embeddings.

Tokenization affects several practical characteristics of an LLM system:

- Context-window consumption
- API costs when pricing is token-based
- Generation latency
- Maximum output length
- Handling of different languages
- Handling of code and unusual characters

Token counts are not equivalent to word counts. Different models may tokenize exactly the same text differently because their vocabularies and tokenizers differ.

### Tokens, Logits & Probabilities

After receiving input tokens, an autoregressive LLM predicts a distribution over possible next tokens.

Before probabilities are calculated, the model produces raw numerical scores called logits. There is generally one logit for every token in the model's vocabulary.

The softmax function converts these logits into probabilities:

`P(token_i) = exp(logit_i) / Σ exp(logit_j)`

The resulting probabilities form a probability distribution whose values sum to approximately 1.

For example:

```text
"cat"    → 0.45
"dog"    → 0.25
"house"  → 0.05
...
```

The generation algorithm then determines which token is selected.

After a token is selected, it becomes part of the context, and the model calculates a new probability distribution for the following token. This process continues until generation stops.

Understanding the relationship between tokens, logits, and probabilities is essential for understanding sampling parameters, log probabilities, confidence interpretation, decoding strategies, and generation behavior.

A high token probability should not automatically be interpreted as factual confidence. It represents confidence about the next token under the model's learned distribution, not necessarily confidence that the underlying statement is objectively true.

### Inference & Generation

Inference is the process of running a trained model to obtain predictions or generated content without updating its learned parameters.

For an autoregressive LLM, generation generally follows this cycle:

1. Input text is tokenized.
2. Tokens are processed by the model.
3. The model produces logits for the next token.
4. Logits are converted or transformed into a probability distribution.
5. A decoding strategy selects the next token.
6. The selected token is appended to the sequence.
7. The process repeats.

Generation ends when the model generates a designated stop token, reaches a configured output limit, encounters a stop sequence, or is terminated by the application.

An important optimization is the KV cache. Transformer attention repeatedly needs previously calculated key and value representations. Instead of recalculating them for every generated token, inference systems cache them.

Inference can therefore be divided conceptually into:

- Prefill: processing the initial input/context.
- Decode: generating subsequent tokens incrementally.

Long prompts particularly affect prefill cost, while long responses require many sequential decoding steps.

### Sampling & Decoding

Decoding determines how the next token is selected from the model's probability distribution.

Greedy decoding always chooses the highest-probability token. It is simple and relatively deterministic but can produce repetitive or overly predictable text.

Sampling instead selects tokens probabilistically.

Temperature modifies the distribution before sampling. Lower temperatures concentrate probability around likely tokens, while higher temperatures flatten the distribution and increase randomness.

Top-k sampling restricts selection to the `k` highest-probability tokens.

Top-p, or nucleus sampling, selects from the smallest set of tokens whose cumulative probability reaches a configured threshold.

Some APIs provide additional controls such as frequency penalties, presence penalties, repetition penalties, logit biases, seeds, or model-specific reasoning parameters.

Sampling parameters interact with one another and with the model itself. Identical settings can behave differently across models.

Deterministic output is also not always guaranteed even with low temperature because inference infrastructure, model implementations, numerical computation, or provider behavior can introduce variation.

### Context Windows

The context window is the maximum amount of tokenized information a model can process within a single inference context.

Depending on the API and model, the context may contain:

- System instructions
- Developer instructions
- User messages
- Assistant messages
- Retrieved documents
- Tool definitions
- Tool results
- Images or multimodal representations
- Conversation history
- Generated output

Context windows are measured in tokens rather than characters or words.

A larger context window allows more information to be provided but does not mean the model will use every piece of information equally effectively. Very large contexts can introduce irrelevant information, conflicting instructions, higher costs, increased latency, and retrieval difficulties.

Context management therefore involves deciding what information should be included, summarized, retrieved dynamically, cached, or discarded.

The context window should not be confused with persistent memory. Information inside the current context is available for that inference; persistent memory requires an external mechanism or platform capability.

### System Prompts & Message Roles

Chat-based LLM APIs organize information into messages with different roles.

Common conceptual roles include:

- System: high-level behavioral instructions.
- Developer: application-level instructions and constraints.
- User: requests or information provided by the user.
- Assistant: previous or generated model responses.
- Tool: information returned by external tools.

Exact role names and precedence rules depend on the model provider and API.

System and developer instructions are commonly used to establish application behavior, output requirements, domain constraints, safety policies, and interaction rules.

Message roles are important because conversational LLM applications are not simply concatenating arbitrary text conceptually; roles provide structure and may influence instruction priority.

Applications should avoid placing untrusted user-controlled content inside privileged instructions because doing so can create prompt-injection vulnerabilities.

### Prompt Engineering

Prompt engineering is the practice of designing model inputs so that an LLM reliably performs a desired task.

Effective prompts commonly define:

- The objective
- Relevant context
- Constraints
- Expected output
- Definitions
- Examples
- Edge cases
- Available tools
- Success criteria

Common techniques include zero-shot prompting, few-shot prompting, explicit formatting requirements, decomposition of complex tasks, supplying reference material, and requesting structured output.

Few-shot prompting provides examples demonstrating expected behavior.

Prompt engineering should not be treated as a replacement for application engineering. Requirements that must be guaranteed should generally be enforced programmatically rather than relying entirely on natural-language instructions.

For example, a prompt can request valid JSON, but schema-constrained structured generation plus validation is more reliable.

Prompts should also be tested systematically because small wording changes can alter model behavior.

### Structured Outputs

Structured outputs constrain or guide model responses into machine-readable structures rather than unrestricted natural language.

JSON is the most common format. More sophisticated APIs may support schema-constrained generation using JSON Schema or equivalent mechanisms.

For example:

```json
{
  "name": "Alice",
  "age": 30,
  "active": true
}
```

Structured outputs are particularly useful when model responses are consumed by software rather than directly by humans.

They provide advantages such as:

- Predictable parsing
- Explicit field types
- Required properties
- Enumerations
- Nested structures
- Easier validation
- Safer integration with application logic

Structured output does not guarantee semantic correctness. A model can produce perfectly valid JSON containing incorrect information.

Applications should therefore distinguish syntactic validity from semantic validity and perform additional validation where necessary.

### Streaming Responses

Streaming allows generated output to be delivered incrementally instead of waiting for the complete response.

Without streaming:

`Request → Complete generation → Complete response`

With streaming:

`Request → Chunk → Chunk → Chunk → ... → Completion`

Streaming improves perceived latency because users can begin seeing the response while generation continues.

Implementations commonly use Server-Sent Events, HTTP streaming, WebSockets, or provider-specific streaming protocols.

Applications must handle partial data carefully. A streamed structured object, function call, or JSON document may not be syntactically complete until generation finishes.

Important concepts include:

- Time to first token
- Incremental rendering
- Stream interruption
- Error handling
- Cancellation
- Backpressure
- Reconstructing the final response from chunks

Streaming generally improves user experience but does not necessarily reduce total model computation.

### Hallucinations

A hallucination occurs when an LLM generates information that is unsupported, fabricated, misleading, or factually incorrect while presenting it as a plausible response.

Hallucinations occur partly because the fundamental generation objective is to produce likely token sequences, not to execute a guaranteed factual lookup.

Hallucinations may involve:

- Invented facts
- Incorrect dates
- Fabricated citations
- Nonexistent APIs
- Incorrect calculations
- Misrepresented source content
- Unsupported conclusions

Mitigation strategies include retrieval-augmented generation, tool use, grounding responses in authoritative sources, explicit uncertainty handling, structured verification, validation rules, and evaluation.

RAG reduces some types of hallucination but does not eliminate them. A model can misunderstand retrieved information or generate unsupported conclusions despite having correct sources available.

For high-stakes applications, model output should not be considered authoritative merely because it sounds confident.

### Embeddings

An embedding is a numerical vector representing semantic characteristics of some input.

An embedding model maps content into a high-dimensional vector:

`text → [0.13, -0.47, 0.82, ...]`

Semantically related inputs tend to have vectors that are closer together according to a similarity metric.

Common similarity measures include:

- Cosine similarity
- Dot product
- Euclidean distance

Embeddings are commonly used for semantic search, recommendation systems, clustering, classification, deduplication, anomaly detection, and RAG.

Embedding models differ from generative LLMs. Their primary purpose is generally to produce useful vector representations rather than generate text.

When building retrieval systems, documents and queries should normally be embedded using compatible models and preprocessing strategies.

### Semantic Search

Semantic search retrieves information according to meaning rather than requiring exact lexical matches.

Traditional keyword search may struggle when a query and document express the same concept using different words. Semantic search addresses this by comparing vector representations.

A basic pipeline is:

`Query → Embedding → Vector similarity search → Relevant documents`

For example, a search for `"ways to reduce server response time"` may retrieve a document discussing `"backend latency optimization"` even without substantial keyword overlap.

Semantic search is particularly useful for natural-language queries and conceptually similar content.

However, it may perform poorly for exact identifiers, product codes, names, dates, or uncommon technical terms. This limitation is one reason hybrid search is often preferable in production systems.

### Chunking Strategies

Documents frequently exceed practical embedding or retrieval units, so they are divided into smaller pieces called chunks.

Chunking strongly influences retrieval quality.

Common approaches include:

- Fixed-token chunking
- Fixed-character chunking
- Paragraph-based chunking
- Sentence-based chunking
- Recursive chunking
- Structure-aware chunking
- Semantic chunking

Chunk overlap can preserve information spanning boundaries, but excessive overlap increases storage, indexing cost, and duplicate retrieval.

Chunks that are too large may contain excessive irrelevant information. Chunks that are too small may lose necessary context.

Good chunking attempts to preserve meaningful semantic units while maintaining useful retrieval granularity.

Metadata such as document ID, section, title, timestamp, permissions, and source URL should usually remain associated with each chunk.

### Vector Databases

A vector database stores vector embeddings and supports efficient similarity search over them.

Instead of asking:

`WHERE id = 123`

a vector query conceptually asks:

`Which vectors are closest to this query vector?`

Because comparing a query against every stored vector becomes expensive at scale, vector systems often use Approximate Nearest Neighbor (ANN) algorithms and indexes.

Common approaches include HNSW and IVF-based indexing.

A vector database or vector-search system commonly provides:

- Vector storage
- Similarity search
- Metadata storage
- Metadata filtering
- Index management
- Persistence
- Scalability
- Namespace or collection management

Vector databases are frequently used as retrieval infrastructure for RAG.

Important design considerations include distance metric, embedding dimensions, indexing parameters, filtering capabilities, update behavior, recall, query latency, and operational cost.

### RAG

Retrieval-Augmented Generation (RAG) combines information retrieval with LLM generation.

A typical ingestion pipeline is:

`Documents → Parsing → Chunking → Embeddings → Retrieval index`

At query time:

`User query → Retrieval → Relevant context → LLM → Answer`

RAG allows applications to provide models with external information at inference time instead of requiring that all relevant information exist in the model's parameters.

Advantages include:

- Access to private data
- Access to frequently changing information
- Source attribution
- Reduced dependence on model parametric knowledge
- Easier knowledge updates than retraining

A production RAG system involves much more than a vector database. Important components include query processing, retrieval, filtering, hybrid search, reranking, context construction, citation handling, authorization, evaluation, observability, and fallback behavior.

RAG quality depends heavily on retrieval quality. If relevant evidence is not retrieved, generation cannot reliably recover it.

### Hybrid Search

Hybrid search combines multiple retrieval methods, most commonly lexical search and semantic vector search.

Lexical systems such as BM25 are strong at matching exact terminology, identifiers, rare words, and names.

Vector search is strong at retrieving semantically related content despite vocabulary differences.

Hybrid retrieval combines their strengths:

`Query → Keyword retrieval + Vector retrieval → Fusion → Results`

Result sets can be combined through weighted scoring or ranking-fusion algorithms such as Reciprocal Rank Fusion.

Hybrid search is particularly useful in enterprise and technical knowledge bases where queries may contain both conceptual language and exact identifiers.

### Reranking

Initial retrieval is optimized for efficiently identifying candidate documents. Reranking performs a more expensive but more accurate second-stage relevance assessment.

A typical pipeline is:

`Query → Retrieve 50 candidates → Reranker → Select best 5`

A reranker examines the query-document relationship more directly than basic vector similarity.

Approaches include:

- Cross-encoder rerankers
- LLM-based reranking
- Specialized ranking models
- Rule-enhanced ranking

Reranking can significantly improve RAG quality because the documents with the highest embedding similarity are not necessarily those that best answer the query.

The tradeoff is additional latency and computational cost.

### Retrieval Evaluation

Retrieval evaluation measures whether a retrieval system is finding and ranking the correct information.

Common metrics include:

- Precision
- Recall
- Precision@k
- Recall@k
- Hit Rate
- Mean Reciprocal Rank (MRR)
- Mean Average Precision (MAP)
- Normalized Discounted Cumulative Gain (NDCG)

`k` represents how many top results are evaluated.

Recall is particularly important in RAG because the generator cannot reliably use evidence that retrieval failed to provide.

Evaluation requires representative queries and some definition of relevant or expected documents. This may come from human labels, production data, synthetic datasets, or carefully constructed test cases.

Retrieval should generally be evaluated independently from generation so developers can determine whether failures originate in retrieval or in the LLM.

### Fine-Tuning

Fine-tuning modifies a pretrained model's parameters using additional training data.

It can be used to teach:

- Domain-specific behavior
- Consistent output styles
- Classification tasks
- Specialized transformations
- Application-specific patterns
- Tool-use behavior

Fine-tuning differs fundamentally from RAG.

RAG supplies information dynamically at inference time. Fine-tuning changes model behavior by modifying weights.

Fine-tuning is generally not the best mechanism for continuously changing factual knowledge. RAG is usually more appropriate when information must frequently be updated, retrieved, attributed, or deleted.

Fine-tuning approaches can include full parameter training and parameter-efficient techniques such as LoRA or adapters.

A robust fine-tuning process requires high-quality training data, validation datasets, evaluation, versioning, and monitoring for regressions.

### Multimodal Models

Multimodal models process more than one type of information.

Modalities may include:

- Text
- Images
- Audio
- Video
- Documents

A multimodal model can potentially analyze images, understand screenshots, transcribe audio, interpret diagrams, or generate content across modalities.

Different systems use different architectures. Inputs may be transformed into representations that can interact with language-model components or processed through modality-specific encoders.

Multimodal applications introduce additional challenges involving resolution, frame selection, audio segmentation, token consumption, latency, file limits, and modality-specific evaluation.

Multimodal capability should not be confused with guaranteed perception accuracy. Models can still misidentify visual objects, misunderstand diagrams, miss small details, or hallucinate content.

### Tool Calling

Tool calling allows an LLM to request execution of external functionality.

A tool can represent operations such as:

- Searching a database
- Calling an API
- Running calculations
- Retrieving files
- Sending messages
- Creating records
- Checking external state

The model normally does not execute the underlying operation itself. Instead, it produces a structured tool request. The application executes the tool and returns the result to the model.

Conceptually:

`User → LLM → Tool request → Application → Tool → Result → LLM → Response`

A tool definition commonly contains a name, description, and input schema.

Tool arguments must be validated before execution. Applications must also enforce authentication, authorization, timeouts, error handling, idempotency where appropriate, and restrictions on side effects.

Tool calling transforms an LLM from a text generator into a component capable of interacting with external systems.

### Tool Routing

Tool routing is the process of deciding which tool should be invoked for a particular request.

Routing may be performed by:

- The LLM itself
- Rules
- Classifiers
- Embedding similarity
- Dedicated routing models
- Hierarchical tool selection
- Hybrid approaches

Routing becomes increasingly important as the number of available tools grows.

Providing hundreds of tool definitions directly to a model may increase context consumption, confusion, latency, and incorrect tool selection. Large systems may therefore first identify a relevant tool category and then expose only appropriate tools.

Effective routing depends heavily on clear tool descriptions, non-overlapping responsibilities, well-defined schemas, and evaluation against realistic requests.

### Model Context Protocol (MCP)

Model Context Protocol (MCP) is an open protocol for connecting AI applications with external tools, resources, and contextual information through a standardized interface.

Instead of implementing a unique integration architecture for every AI application and data source, MCP defines common patterns for communication between hosts, clients, and servers.

Conceptually:

`AI Application / Host ↔ MCP Client ↔ MCP Server ↔ External System`

MCP servers can expose capabilities such as tools, resources, and prompts, depending on the implementation and protocol version.

MCP does not replace tool calling itself. Rather, it standardizes how applications discover and interact with external capabilities and contextual sources.

Important engineering concerns remain:

- Authentication
- Authorization
- Trust boundaries
- User consent
- Tool permissions
- Input validation
- Server security
- Prompt injection
- Data exposure
- Auditing

Using MCP does not automatically make an integration secure.

### State Management

State is information that must persist across steps of an application or workflow.

Examples include:

- Conversation history
- Current workflow step
- Tool results
- User selections
- Intermediate calculations
- Agent progress
- Pending actions

State may be transient, session-scoped, workflow-scoped, or persistent.

State can be stored in application memory, databases, caches, workflow engines, event stores, or external services.

LLM context itself should not be treated as the application's sole source of truth. Critical state should usually be represented explicitly in deterministic application infrastructure.

Reliable state management becomes especially important for long-running agent workflows, retries, distributed systems, and workflows containing side effects.

### Memory Systems

Memory systems allow AI applications to preserve useful information beyond the immediate model context.

Common categories include:

- Short-term or working memory
- Conversation memory
- Long-term memory
- Semantic memory
- Episodic memory
- Procedural or application-specific memory

Memory can be implemented using databases, vector stores, structured user profiles, summaries, event histories, or combinations of these.

A memory system typically needs mechanisms for:

`Write → Store → Retrieve → Update → Forget`

Not every conversation detail should become persistent memory. Effective systems determine what is worth storing and when it should be retrieved.

Important concerns include:

- Relevance
- Freshness
- Contradictions
- Deduplication
- User control
- Privacy
- Data retention
- Deletion
- Authorization
- Memory poisoning

Memory differs from RAG primarily in purpose: RAG generally retrieves external knowledge, while memory often preserves information derived from prior interactions or application history. Architecturally, however, the mechanisms can overlap.

### AI Agents

An AI agent is a system in which a model participates in deciding what actions to take in pursuit of an objective.

A simplified agent loop is:

`Observe → Reason/Decide → Act → Observe result → Continue`

Agents often combine:

- LLM reasoning
- Tools
- State
- Memory
- Planning
- Retrieval
- Environment interaction
- Control logic

An agent differs from a simple chatbot because it can perform multi-step actions rather than merely generate a single response.

Agent autonomy exists on a spectrum. Some agents only choose between a few safe tools, while others can dynamically plan long workflows.

Greater autonomy increases the importance of permissions, budgets, termination conditions, validation, observability, and human oversight.

### Agent Planning

Agent planning is the process of determining intermediate actions required to accomplish a larger objective.

Instead of attempting:

`Goal → Final answer`

the system may construct:

`Goal → Step A → Step B → Step C → Result`

Planning may be explicit or implicit. Some architectures generate a complete plan before execution, while others repeatedly decide the next action based on current state.

Planning systems must handle changing information and tool failures. Consequently, rigid plans often need replanning mechanisms.

Important concepts include:

- Task decomposition
- Dependency management
- Replanning
- Progress tracking
- Termination conditions
- Error recovery
- Budget constraints

Planning is useful when tasks require multiple dependent operations, but unnecessary planning can increase latency, cost, and failure opportunities.

### Agentic Workflows

An agentic workflow combines deterministic workflow logic with model-driven decisions.

Not every step needs to be autonomous. A reliable architecture might contain:

`Deterministic step → LLM decision → Tool → Validation → Deterministic step`

This differs from giving an agent unrestricted control over the entire process.

Common patterns include:

- Routing
- Sequential workflows
- Parallel execution
- Evaluator-optimizer loops
- Planner-executor architectures
- Retry and reflection loops
- Human approval checkpoints

Agentic workflows are often preferable to completely autonomous agents because deterministic control can be retained where reliability matters while models handle ambiguous decisions.

### Human-in-the-Loop

Human-in-the-Loop (HITL) systems deliberately require human involvement at selected points in an AI workflow.

Humans may:

- Approve actions
- Review generated content
- Correct model decisions
- Resolve ambiguity
- Provide missing information
- Escalate exceptional cases

For example:

`Agent → Proposed financial transaction → Human approval → Execution`

HITL is especially important when actions are expensive, irreversible, legally significant, security-sensitive, or otherwise high-risk.

Approval should occur before the consequential side effect whenever possible.

HITL systems also require careful UX design. Excessive approval requests create fatigue, while insufficient approvals create risk.

### Multi-Agent Systems

Multi-agent systems use multiple agents that have separate roles, capabilities, contexts, or responsibilities.

Examples include:

- Planner agent
- Research agent
- Coding agent
- Reviewer agent
- Coordinator agent

Agents may communicate directly or through an orchestrator.

Potential advantages include specialization, parallelism, modularity, and independent verification.

However, multi-agent architectures introduce substantial complexity:

- More model calls
- Higher costs
- Increased latency
- Coordination failures
- Conflicting conclusions
- Shared-state problems
- Harder debugging
- More complicated evaluation

A multi-agent architecture should therefore be used because task structure requires it, not simply because multiple agents appear more sophisticated.

### Guardrails

Guardrails are controls designed to constrain model behavior or system actions.

They may operate at multiple layers:

- Input validation
- Prompt-level restrictions
- Model safety mechanisms
- Output validation
- Tool permissions
- Business-rule enforcement
- Content filtering
- Human approval
- Infrastructure controls

Guardrails can be deterministic or model-based.

Examples include schema validation, allowlists, permission checks, maximum transaction values, content classifiers, and confirmation requirements.

Prompt instructions alone are generally insufficient as security boundaries. Critical restrictions should be enforced outside the model whenever possible.

Defense in depth is preferable: multiple independent controls should protect high-risk operations.

### Eval Frameworks

Evaluation frameworks systematically measure AI-system quality.

Evaluation should be based on representative tasks rather than isolated demonstrations.

Evaluation types include:

- Offline evaluation
- Online evaluation
- Human evaluation
- Model-based evaluation
- Regression testing
- A/B testing
- Retrieval evaluation
- Tool-use evaluation
- Safety evaluation

Metrics depend on the task and may include accuracy, relevance, groundedness, completeness, format compliance, tool-selection accuracy, task completion, latency, and cost.

LLM-as-a-judge evaluation uses another model to score outputs. It scales efficiently but introduces potential bias and should be calibrated against human judgment for important applications.

A good evaluation dataset includes normal cases, difficult cases, edge cases, adversarial cases, and previously observed production failures.

Evals should be integrated into development so changes to prompts, models, retrieval, tools, or infrastructure can be tested for regressions.

### Observability & Tracing

Observability makes the behavior of an LLM application inspectable in development and production.

A trace may capture:

`Request → Retrieval → Model → Tool → Model → Response`

Useful telemetry includes:

- Model calls
- Prompt versions
- Token usage
- Latency
- Tool invocations
- Retrieval results
- Errors
- Retries
- Costs
- Model versions
- Workflow state

Tracing is particularly important for agents because a final incorrect response may result from an error several steps earlier.

Observability should also respect privacy and security. Prompts and tool results may contain sensitive information, so logging requires appropriate redaction, retention, and access policies.

### Caching

Caching stores reusable results to avoid repeating expensive computation.

Possible cache layers include:

- Application response caching
- Retrieval caching
- Embedding caching
- Tool-result caching
- Prompt/prefix caching
- Provider-side context caching

Caching can reduce latency and cost significantly.

However, cached information can become stale. Cache design therefore requires appropriate keys, expiration policies, invalidation strategies, versioning, and consideration of user-specific data.

Semantic caching goes beyond exact request matching by identifying semantically similar queries that may reuse a previous result.

Caching must be used carefully for personalized, permission-sensitive, rapidly changing, or nondeterministic responses.

### Model Routing

Model routing dynamically selects which model should handle a request.

For example:

`Simple request → Fast/cheap model`

`Complex reasoning → More capable model`

`Image task → Multimodal model`

Routing decisions can consider task complexity, modality, latency requirements, cost, context length, quality requirements, safety requirements, and model availability.

Routing may use rules, classifiers, smaller models, or adaptive systems.

Effective routing can substantially reduce costs while maintaining quality, but it requires evaluation because incorrectly routing difficult tasks to weaker models can degrade performance.

Fallback routing can also improve resilience when a model is unavailable or reaches capacity limits.

### Rate Limits & Concurrency

LLM providers generally impose limits on how frequently or heavily APIs can be used.

Limits may include:

- Requests per minute
- Tokens per minute
- Requests per day
- Concurrent requests
- Model-specific quotas

Concurrency refers to multiple operations executing simultaneously.

Applications must handle rate-limit errors and temporary capacity problems gracefully.

Common techniques include:

- Exponential backoff
- Jitter
- Request queues
- Concurrency controls
- Batching
- Load shedding
- Retry policies

Retries require particular care when tools perform side effects. Retrying an operation such as creating a payment or sending a message can duplicate the action unless idempotency mechanisms exist.

### Latency Optimization

Latency optimization attempts to reduce the time users or systems wait for AI operations.

Important measurements include:

- Time to first token
- Total response time
- Tokens generated per second
- Tool latency
- Retrieval latency
- End-to-end workflow latency

Optimization techniques include:

- Streaming
- Reducing unnecessary context
- Using smaller models
- Parallelizing independent operations
- Caching
- Optimizing retrieval
- Limiting output length
- Reducing sequential model calls
- Reusing prefixes or cached context
- Efficient tool design

Agentic systems can have particularly high latency because several model and tool calls may execute sequentially.

Optimization should be performed using measurements and traces rather than intuition.

### Cost Optimization

LLM application cost can come from multiple sources:

- Input tokens
- Output tokens
- Cached tokens
- Model calls
- Embedding generation
- Reranking
- Vector storage
- External tools
- Agent loops
- Infrastructure

Common optimization strategies include selecting the smallest model that reliably satisfies the task, reducing unnecessary context, caching reusable work, limiting generation, batching operations, optimizing retrieval, and routing requests according to complexity.

Agent loops should have explicit budgets or limits because uncontrolled iteration can generate unexpectedly high costs.

Cost optimization should not be performed independently of quality. A cheaper system that frequently fails and retries may ultimately cost more.

A useful production metric is often cost per successfully completed task rather than simply cost per individual model request.

### LLM Security

LLM security concerns the protection of AI applications from attacks, misuse, unintended data disclosure, and unsafe actions.

One of the central threats is prompt injection. Untrusted content can contain instructions designed to manipulate the model.

For example, a retrieved webpage might contain malicious text telling an agent to ignore its instructions and expose confidential information.

Indirect prompt injection occurs when malicious instructions are embedded in external content consumed by the model rather than directly submitted as the user's prompt.

Other important risks include:

- Data exfiltration
- Tool abuse
- Excessive permissions
- Unauthorized actions
- Sensitive-data leakage
- Insecure output handling
- Memory poisoning
- Retrieval poisoning
- Malicious tool responses
- Denial-of-wallet attacks
- Resource exhaustion
- Supply-chain risks involving external tools or integrations

A fundamental security principle is that model output and external content should be treated as untrusted.

LLMs should not directly control high-privilege operations without deterministic authorization and validation.

Security architecture should include least-privilege tool access, authentication, authorization, input and output validation, sandboxing where appropriate, network restrictions, secret isolation, human confirmation for consequential actions, audit logs, rate limits, and monitoring.

Instructions such as `"never reveal this secret"` are not equivalent to access control. Secrets that the model does not need should not be placed in its context.

RAG, agents, tools, memory, and MCP all expand the attack surface because they connect probabilistic models to external data and actions. The more authority an AI system receives, the more important deterministic security boundaries become.

The key principle is: `The model may propose; trusted application infrastructure must authorize and enforce.`

## Protocols

- [MCP - Model Context Protocol](https://modelcontextprotocol.io)

- [MCP Servers](https://mcpservers.org)

## Local

- [Ollama](https://ollama.com)

- [LM Studio](https://lmstudio.ai)

- [LocalAI](https://localai.io)

## Interfaces

- [Open WebUI](https://openwebui.com)

- [Anything LLM](https://anythingllm.com)

## Platforms

- [ChatGPT Desktop](https://chatgpt.com/features/desktop)

- [Claude Desktop](https://claude.com/download)

- [Perplexity](https://www.perplexity.ai)

## IDE

- [Cursor](https://cursor.com)

## Frameworks

- [LangChain](https://www.langchain.com)

- [LlamaIndex](https://www.llamaindex.ai)

- [CrewAI](https://www.crewai.com)

- [AutoGen](https://microsoft.github.io/autogen)

## Machine Learning

- **Random Forest:** Combines multiple decision trees for accurate, robust classification and regression.

- **SVM:** Identifies optimal hyperplane to maximize class separation with high accuracy.

- **K-Nearest Neighbors:** Classifies data points by majority vote of nearest neighbors.

- **Decision Tree:** Divides data into branches using feature splits for clear decisions.

- **Logistic Regression:** Uses a logistic function to model the probability of a binary outcome.

- **Naive Bayes:** Applies Bayes' Theorem with strong (naive) independence assumptions to classify data.

- [Python Compiler](https://www.mycompiler.io/new/python)

## Prompt

```
[ROLE]
- You are a senior software architect

[PRINCIPLES]
- You must apply Clean Code, SOLID, KISS, DRY, and DDD principles
- You must enforce production-ready code standards
- You must resolve conflicts by prioritizing clarity over optimization and simplicity over abstraction

[ARCHITECTURE]
- You must use a flat and direct architecture for specific tasks, snippets, or small features
- You must not apply Hexagonal or Layered Architecture unless explicitly requested
- When architecture is requested:
    - You must enforce separation between domain, application, and infrastructure layers
    - You must enforce domain isolation from frameworks
    - You must not allow infrastructure concerns to leak into the domain

[CODE-STYLE]
- You must use English for all code, identifiers, and technical artifacts
- You must enforce naming consistency
- You must not use abbreviations
- You must not use code comments
- You must enforce fail-fast behavior
- You must enforce consistent structure across files
- You must apply established design patterns when justified

[DEPENDENCIES]
- You must avoid adding dependencies unless strictly necessary
- You must use only official and well-maintained dependencies

[DEPENDENCY-INJECTION]
- You must use constructor injection
- You must never use field injection

[TESTABILITY]
- You must apply unit testing by default
- You must not use hidden dependencies
- You must not use static state or side effects
- You must enforce small and deterministic methods
- You must enforce test coverage of all scenarios

[PERFORMANCE]
- You must enforce clarity over micro-optimizations
- You must avoid unnecessary object creation
- You must apply optimization only with clear evidence

[ANTI-PATTERNS]
- You must avoid large classes
- You must avoid unnecessary abstractions
- You must avoid patterns without justification
- You must avoid premature optimization
- You must avoid over-engineering

[API-DESIGN]
- You must follow REST principles
- You must use appropriate HTTP methods and status codes
- You must validate input at boundaries
- You must not expose internal models

[JAVA]
- You must use latest stable versions of Java and Spring Boot
- You must use modern Java features
- You must use immutability by default
- You must use Lombok where applicable
- You must use Optional where applicable
- You must not use null for collections

[OUTPUT]
- You must enforce conciseness and directness
- You must return only code when code generation is explicitly requested
- You must not provide explanations unless explicitly required
- You must not provide alternatives unless explicitly required
```
