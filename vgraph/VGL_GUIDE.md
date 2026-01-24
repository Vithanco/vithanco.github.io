# Vithanco Graph Language (VGL) Guide

## Table of Contents
- [Concepts](#concepts)
- [Grammar](#grammar)
- [Examples](#examples)

---

## Concepts

### Overview

The Vithanco Graph Language (VGL) is a human-readable text format for creating and editing graphs. VGL provides a simple, declarative syntax for defining nodes, edges, groups, and their attributes.

### Notation

Every VGL document must declare a notation, which defines the types of nodes and edges available in the graph.

**Syntax:**
```
vgraph <graph_id>: <NOTATION> "<graph_label>" {
    ...
}
```

VGL currently supports built-in notations that come with predefined node types and edge types:
- **IBIS** (Issue-Based Information System) - for decision-making and argumentation
- **BBS** (Benefit Breakdown Structure) - for benefit analysis
- **ImpactMapping** - for strategic planning and goal alignment
- **ConceptMap** - for visualizing relationships between concepts

The notation determines what node types and edge types are available in your graph.

### Nodes

Nodes represent the primary entities in your graph. Each node has:
- **ID**: A unique identifier (required)
- **Type**: The kind of node, determined by the notation (required)
- **Label**: A human-readable display name (optional)
- **Attributes**: Additional properties like color, fontsize, etc. (optional)

**Syntax:**
```
node <id>: <NodeType> "<label>" [<attributes>];
```

**Example:**
```vgl
node q1: Question "What should we do?" [fontsize: 16; color: red];
```

### Node Types

Node types are defined by the chosen notation. Each notation has its own set of node types with specific purposes and default styling.

**IBIS Node Types:**
- `Question` - A question or issue to be resolved (default: blue)
- `Answer` - A proposed answer or solution (default: pink)
- `Pro` - An argument supporting an answer (default: green)
- `Con` - An argument opposing an answer (default: red)

**BBS Node Types:**
- `InvestmentObjective` - High-level business objective
- `Benefit` - Expected benefit from the investment
- `BusinessChange` - Organizational or process change required
- `Enabler` - Technology or capability enabler

**ImpactMapping Node Types:**
- `Goal` - Strategic goal or objective (default: dark blue)
- `Actor` - Person or group who can produce impact (default: blue)
- `Impact` - Behavioral change or outcome (default: cyan)
- `Deliverable` - Product feature or capability (default: green)

**ConceptMap Node Types:**
- `Concept` - A concept or term (default: blue rounded box)
- `EmphasizedConcept` - An important concept to highlight (default: red rounded box)
- `Relation` - A relationship verb connecting concepts (default: bare text)

### Edges

Edges represent connections between nodes. Each edge has:
- **From**: Source node ID (required)
- **To**: Target node ID (required)
- **Type**: The kind of connection (optional, can be inferred)
- **Label**: A description of the relationship (optional)
- **Attributes**: Additional properties like style, weight, etc. (optional)

**Syntax:**
```
edge <from_id> -> <to_id>: <EdgeType> "<label>" [<attributes>];
```

**Concise Syntax** (omitting type):
```
edge <from_id> -> <to_id>;
```

When the edge type is omitted, VGL will automatically infer it based on the connected node types, if unambiguous.

**Example:**
```vgl
edge q1 -> a1: answered_by "Initial solution";
edge a1 -> pro1 [style: dashed];
edge q2 -> a2;  // Type inferred from node types
```

### Edge Types

Edge types are defined by the notation and specify valid connections between node types.

**IBIS Edge Types:**
- `answered_by` - Connects Question → Answer
- `supports` - Connects Answer → Pro
- `objects_to` - Connects Answer → Con
- `pro_questions_question` - Connects Pro → Question
- `con_questions_question` - Connects Con → Question

**BBS Edge Types:**
- `requires_benefit` - Connects Benefit → InvestmentObjective
- `requires_business_change` - Connects BusinessChange → Benefit
- `requires_enabler` - Connects Enabler → BusinessChange
- `change_requires_change` - Connects BusinessChange → BusinessChange
- `enabler_requires_enabler` - Connects Enabler → Enabler

**ImpactMapping Edge Types:**
- `goal_to_actor` - Connects Goal → Actor
- `actor_to_impact` - Connects Actor → Impact
- `impact_to_deliverable` - Connects Impact → Deliverable

**ConceptMap Edge Types:**
- `concept_to_relation` - Connects Concept → Relation (tail marker only)
- `relation_to_concept` - Connects Relation → Concept (arrow head only)

Edge types ensure that connections make semantic sense within the notation's domain.

### Groups

Groups organize nodes hierarchically and can be nested to create subgroups. Groups help visually organize complex graphs.

**Syntax:**
```
group <id> "<label>" {
    <attributes>;
    <nodes>;
    <edges>;
    <nested_groups>;
};
```

**Features:**
- Groups can contain nodes, edges, and other groups
- Groups can have attributes like `style`, `color`, `label`
- Groups can be nested to unlimited depth
- Edges can connect nodes across different groups

**Example:**
```vgl
group research "Research Phase" {
    style: filled;
    color: lightblue;

    node q1: Question "What to research?";
    node a1: Answer "User interviews";

    group methodology "Methods" {
        node m1: Pro "Direct feedback";
    };
};
```

### Attributes

Attributes customize the appearance and behavior of nodes, edges, and groups.

**Inline Syntax** (brackets):
```
[attribute1: value1; attribute2: value2]
```

**Graph-Level Attributes** (inside graph body):
```
rankdir: LR;
fontcolor: darkblue;
```

**Common Node Attributes:**
- `color` - Node color (e.g., `red`, `blue`, `#FF0000`)
- `fontsize` - Font size for node label (number)
- `shape` - Node shape (varies by notation)

**Common Edge Attributes:**
- `style` - Line style (`solid`, `dashed`, `dotted`)
- `weight` - Edge weight (number)
- `label` - Edge label text

**Common Group Attributes:**
- `style` - Group style (`filled`, `dashed`, `dotted`)
- `color` - Group background or border color
- `label` - Group display name

**Common Graph Attributes:**
- `rankdir` - Layout direction (`LR` for left-to-right, `TB` for top-to-bottom)
- `fontcolor` - Default font color
- `labeljust` - Label justification (`l` for left, `r` for right, `c` for center)

### Comments

VGL supports single-line comments using `//`:

```vgl
// This is a comment
node q1: Question "Main question";  // This is also a comment
```

Comments can appear anywhere in the document and are ignored by the parser.

---

## Grammar

The VGL grammar is defined as follows (simplified BNF notation):

```
document     ::= "vgraph" identifier ":" notation label? "{" statement* "}"

notation     ::= identifier
                 // Built-in notations: IBIS, BBS, ImpactMapping, ConceptMap

statement    ::= group | node | edge | attribute

group        ::= "group" identifier label? "{" statement* "}" ";"

node         ::= "node" identifier ":" identifier label? attributes? ";"

edge         ::= "edge" identifier "->" identifier (":" identifier)? label? attributes? ";"

attribute    ::= identifier ":" value ";"?

attributes   ::= "[" (attribute ";")* "]"

label        ::= quoted_string

value        ::= quoted_string | number | identifier

identifier   ::= [a-zA-Z0-9_\.\,\-]+

number       ::= [-]?[0-9]+(\.[0-9]+)?

quoted_string::= "\"" ([^\"\\] | "\\" .)* "\""

comment      ::= "//" [^\n]*
```

**Key Grammar Rules:**

1. **Document Structure**: Every VGL file must start with a `vgraph` declaration
2. **Node IDs**: Must be unique throughout the document
3. **Edge References**: Edges can only reference nodes that have been declared
4. **Type Validation**: Node types and edge types must be valid for the chosen notation, or will be marked as "unknown"
5. **Attributes**: Can appear inline with brackets `[]` or as separate statements within groups
6. **Semicolons**: Required after nodes, edges, groups, and standalone attributes
7. **Quoted Strings**: Used for labels and string attribute values, support escape sequences (`\"`, `\\`, etc.)
8. **Comments**: Single-line only, using `//` syntax

---

## Examples

### Example 1: Simple IBIS Graph

A basic decision-making graph with questions and answers:

```vgl
vgraph simple_decision: IBIS "Simple Decision" {
    node q1: Question "What framework should we use?";
    node a1: Answer "React";
    node a2: Answer "Vue";

    edge q1 -> a1;
    edge q1 -> a2;
}
```

### Example 2: IBIS with Arguments

A more complete decision graph with pro and con arguments:

```vgl
vgraph tech_decision: IBIS "Technology Decision" {
    node q1: Question "Which database should we use?";
    node a1: Answer "PostgreSQL";
    node a2: Answer "MongoDB";

    node pro1: Pro "ACID compliance";
    node pro2: Pro "Flexible schema";
    node con1: Con "More complex setup";
    node con2: Con "Limited transaction support";

    edge q1 -> a1: answered_by;
    edge q1 -> a2: answered_by;
    edge a1 -> pro1: supports;
    edge a1 -> con1: objects_to;
    edge a2 -> pro2: supports;
    edge a2 -> con2: objects_to;
}
```

### Example 3: Using Groups

Organizing nodes into logical groups:

```vgl
vgraph project_planning: IBIS "Project Planning" {
    node main_q: Question "How should we structure the project?" [fontsize: 20];

    group architecture "Architecture Decisions" {
        style: filled;
        color: lightblue;

        node q1: Question "Which architecture pattern?";
        node a1: Answer "Microservices";
        node a2: Answer "Monolithic";

        edge q1 -> a1;
        edge q1 -> a2;
    };

    group testing "Testing Strategy" {
        style: filled;
        color: lightgreen;

        node q2: Question "What testing approach?";
        node a3: Answer "TDD";
        node a4: Answer "BDD";

        edge q2 -> a3;
        edge q2 -> a4;
    };

    edge main_q -> q1: answered_by "Consider architecture";
    edge main_q -> q2: answered_by "Define testing";
}
```

### Example 4: Nested Groups with Attributes

Complex hierarchical structure with styling:

```vgl
vgraph research_project: IBIS "Research Project" {
    rankdir: LR;

    group phase1 "Discovery Phase" {
        style: filled;
        color: lightyellow;

        node q1: Question "What should we research?" [fontsize: 16];
        node a1: Answer "User behavior" [fontsize: 14];
        node a2: Answer "Market trends" [fontsize: 14];

        group methods "Research Methods" {
            style: dashed;
            color: orange;

            node pro1: Pro "Interviews provide depth" [fontsize: 12];
            node pro2: Pro "Surveys give breadth" [fontsize: 12];
            node con1: Con "Time consuming" [fontsize: 12];
        };

        edge q1 -> a1;
        edge q1 -> a2;
        edge a1 -> pro1: supports;
        edge a1 -> con1: objects_to;
    };

    group phase2 "Analysis Phase" {
        style: filled;
        color: lightblue;

        node q2: Question "How to analyze data?" [fontsize: 16];
        node a3: Answer "Quantitative analysis" [fontsize: 14];
    };
}
```

### Example 5: Minimal Syntax

Using the most concise syntax available:

```vgl
vgraph minimal: IBIS "Minimal Example" {
    // Questions and answers
    node q1: Question "Question 1";
    node a1: Answer "Answer 1";
    node a2: Answer "Answer 2";

    // Arguments
    node p1: Pro "Pro argument";
    node c1: Con "Con argument";

    // Edges with inferred types
    edge q1 -> a1;
    edge q1 -> a2;
    edge a1 -> p1;
    edge a1 -> c1;
}
```

### Example 6: Complex Graph with All Features

A comprehensive example demonstrating all VGL features:

```vgl
vgraph comprehensive: IBIS "Comprehensive Example" {
    // Graph-level properties
    rankdir: LR;
    fontcolor: darkblue;
    labeljust: l;

    // Root-level nodes
    node root: Question "Main Question" [fontsize: 20; color: navy];
    node ans1: Answer "Primary Solution" [fontsize: 16];
    node ans2: Answer "Alternative Solution" [fontsize: 16];

    // Detailed analysis group
    group analysis "Detailed Analysis" {
        style: filled;
        color: lightgray;

        node q_perf: Question "What about performance?";
        node a_fast: Answer "Optimize critical paths" [color: green];
        node pro_perf: Pro "40% faster response time" [fontsize: 12];

        // Nested considerations
        group tradeoffs "Trade-offs" {
            style: dashed;
            color: yellow;

            node con_complex: Con "Increased code complexity" [fontsize: 10];
            node q_maint: Question "Can we maintain this?" [fontsize: 11];
        };

        edge q_perf -> a_fast: answered_by;
        edge a_fast -> pro_perf: supports;
        edge a_fast -> con_complex: objects_to;
        edge con_complex -> q_maint: con_questions_question "Raises concern";
    };

    // Implementation group
    group implementation "Implementation Plan" {
        style: filled;
        color: lightblue;

        node q_when: Question "When to implement?" [fontsize: 14];
        node a_phase: Answer "Phased rollout" [fontsize: 13];
        node pro_safe: Pro "Reduces risk" [fontsize: 11];

        edge q_when -> a_phase;
        edge a_phase -> pro_safe;
    };

    // Cross-group connections
    edge root -> ans1: answered_by "Main path";
    edge root -> ans2: answered_by "Backup option";
    edge ans1 -> q_perf: answered_by [style: dashed; weight: 5];
    edge ans2 -> q_when: answered_by;
}
```

### Example 7: Using Explicit Edge Types

Demonstrating all IBIS edge types:

```vgl
vgraph edge_types: IBIS "Edge Type Examples" {
    // Setup nodes
    node q1: Question "Should we proceed?";
    node a1: Answer "Yes, with caution";
    node pro1: Pro "Market opportunity";
    node con1: Con "Technical debt";
    node q2: Question "How to mitigate risks?";

    // Demonstrate each edge type
    edge q1 -> a1: answered_by;
    edge a1 -> pro1: supports;
    edge a1 -> con1: objects_to;
    edge pro1 -> q2: pro_questions_question;
    edge con1 -> q2: con_questions_question;
}
```

### Example 8: Impact Mapping

A strategic planning graph showing goals, actors, impacts, and deliverables:

```vgl
vgraph mobileApp: ImpactMapping "Mobile App Launch" {
    node g1: Goal "Increase Revenue by 30%";
    node a1: Actor "New Customers";
    node a2: Actor "Existing Customers";
    node i1: Impact "Make First Purchase";
    node i2: Impact "Increase Purchase Frequency";
    node i3: Impact "Upgrade to Premium";
    node d1: Deliverable "Mobile App with Easy Checkout";
    node d2: Deliverable "Push Notifications for Deals";
    node d3: Deliverable "Loyalty Rewards Program";
    node d4: Deliverable "Premium Features Bundle";

    edge g1 -> a1: goal_to_actor;
    edge g1 -> a2: goal_to_actor;
    edge a1 -> i1: actor_to_impact;
    edge a2 -> i2: actor_to_impact;
    edge a2 -> i3: actor_to_impact;
    edge i1 -> d1: impact_to_deliverable;
    edge i2 -> d2: impact_to_deliverable;
    edge i2 -> d3: impact_to_deliverable;
    edge i3 -> d4: impact_to_deliverable;
}
```

### Example 9: Impact Mapping with Inferred Types

Using type inference for cleaner syntax:

```vgl
vgraph product_growth: ImpactMapping "Product Growth Strategy" {
    // Strategic goal
    node goal: Goal "Double User Engagement";

    // Key actors
    node power_users: Actor "Power Users";
    node casual_users: Actor "Casual Users";
    node new_users: Actor "New Users";

    // Desired impacts
    node i1: Impact "Share content more frequently";
    node i2: Impact "Complete onboarding successfully";
    node i3: Impact "Return within 7 days";

    // Required deliverables
    node d1: Deliverable "Social sharing features";
    node d2: Deliverable "Interactive tutorial";
    node d3: Deliverable "Email reminder system";

    // Connections with inferred types
    edge goal -> power_users;
    edge goal -> casual_users;
    edge goal -> new_users;
    edge power_users -> i1;
    edge new_users -> i2;
    edge casual_users -> i3;
    edge i1 -> d1;
    edge i2 -> d2;
    edge i3 -> d3;
}
```

### Example 10: Concept Map

Visualizing relationships between concepts using linking verbs:

```vgl
vgraph learningCM: ConceptMap "How Learning Works" {
    // Main concepts
    node c1: Concept "Student";
    node c2: Concept "Subject";
    node c3: EmphasizedConcept "Practice";  // Emphasized for importance
    node c4: Concept "Understanding";
    node c5: Concept "Resources";

    // Relationship verbs (relations)
    node r1: Relation "learns";
    node r2: Relation "requires";
    node r3: Relation "leads to";
    node r4: Relation "uses";

    // Concept map connections
    // Pattern: Concept -> Relation -> Concept
    edge c1 -> r1: concept_to_relation;
    edge r1 -> c2: relation_to_concept;
    edge c2 -> r2: concept_to_relation;
    edge r2 -> c3: relation_to_concept;
    edge c3 -> r3: concept_to_relation;
    edge r3 -> c4: relation_to_concept;
    edge c2 -> r4: concept_to_relation;
    edge r4 -> c5: relation_to_concept;
}
```

**Note**: In concept maps, relationships are represented as nodes (Relation type) rather than edge labels. This creates readable propositions like "Student learns Subject" and "Subject requires Practice".

---

## Best Practices

1. **Use Meaningful IDs**: Choose descriptive node IDs like `security_question` instead of `n1`
2. **Organize with Groups**: Use groups to organize related nodes and improve readability
3. **Leverage Type Inference**: Omit edge types when they can be inferred from node types
4. **Add Labels**: Always provide labels for better human readability
5. **Comment Your Graphs**: Use comments to explain complex relationships or decisions
6. **Keep It Simple**: Start with minimal syntax and add attributes only when needed
7. **Consistent Naming**: Use a consistent naming convention for IDs (e.g., snake_case or camelCase)
8. **Hierarchical Organization**: Use nested groups to reflect the natural hierarchy of your domain

---

## Error Handling

VGL provides clear error messages for common issues:

- **Duplicate Node ID**: Each node ID must be unique
- **Undefined Node Reference**: Edges can only reference existing nodes
- **Invalid Node Type**: Node types must exist in the chosen notation (creates "unknown" type)
- **Invalid Edge Type**: Edge types must be valid for the connected node types (creates "unknown" edge type)
- **Syntax Errors**: Missing semicolons, braces, or other syntax requirements

When a node type or edge type is not found in the notation, VGL will create an "unknown" type to allow the graph to be processed, but you should verify that the type names are correct.
