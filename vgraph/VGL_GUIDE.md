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
- **CRT** (Current Reality Tree) - for root cause analysis using Theory of Constraints
- **FRT** (Future Reality Tree) - for solution validation using Theory of Constraints
- **PRT** (Prerequisite Tree) - for planning with necessary condition thinking using Theory of Constraints
- **TRT** (Transition Tree) - for step-by-step implementation planning using Theory of Constraints
- **ADTree** (Attack-Defense Tree) - for security modelling of attack and defense interactions

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

**CRT Node Types:**
- `UndesirableEffect` - An unwanted outcome requiring investigation (default: red)
- `IntermediateEffect` - A neutral outcome in the causal chain (default: blue)
- `DesirableEffect` - A wanted outcome caused by other conditions (default: green)
- `Given` - An unchangeable constant like laws or physics (default: dark purple)
- `Changeable` - A modifiable condition that can be addressed (default: light purple)
- `AndJunctor` - Indicates multiple conditions required simultaneously (icon: AND circle)
- `OrJunctor` - Indicates alternative causes (icon: OR circle)

**FRT Node Types:**
FRT shares the same node types as CRT, as both are Theory of Constraints tools. The difference is in usage: FRT starts with solutions (Changeable/injections) and builds upward to show how they lead to desirable effects.
- `Changeable` - Proposed solutions or injections to implement (default: light purple)
- `Given` - Unchangeable facts that still apply (default: dark purple)
- `IntermediateEffect` - Expected intermediate outcomes from solutions (default: blue)
- `DesirableEffect` - Goals we want to achieve (default: green)
- `UndesirableEffect` - Potential negative side effects to monitor (default: red)
- `AndJunctor` - Indicates multiple conditions required simultaneously (icon: AND circle)
- `OrJunctor` - Indicates alternative paths to outcomes (icon: OR circle)

**PRT Node Types:**
PRT (Prerequisite Tree) is a planning tool using necessary condition thinking. It starts with the desired objective and works backward to identify obstacles and the intermediate objectives needed to overcome them.
- `Objective` - The desired goal you aim to achieve (default: green)
- `Obstacle` - Barriers preventing objective achievement (default: red)
- `IntermediateObjective` - A milestone that overcomes a specific obstacle (default: blue)
- `OR` - Connector allowing optional conditions instead of requiring all predecessors (icon: OR circle)

**TRT Node Types:**
TRT (Transition Tree) is an implementation planning tool that answers "HOW TO CAUSE the change?" by providing step-by-step actions needed to implement changes. It shares node types with CRT/FRT but focuses on the detailed action sequence.
- `UndesirableEffect` - Current state problems being addressed (default: red)
- `IntermediateEffect` - Stepping stone outcomes from actions (default: blue)
- `DesirableEffect` - Goal outcomes we want to achieve (default: green)
- `Given` - Unchangeable facts and constraints (default: dark purple)
- `Changeable` - Actions we can take to cause change (default: light purple)
- `AndJunctor` - Indicates multiple conditions required together for an effect (icon: AND circle)

**ADTree Node Types:**
ADTree (Attack-Defense Tree) is a security modelling methodology based on Kordy et al. (2014). It extends classical attack trees by allowing defense nodes at any level, modelling the ongoing arms race between attacker and defender.
- `Attack` - An attacker's goal or sub-goal (default: red)
- `Defense` - A defender's countermeasure or protective measure (default: green)
- `AndJunctor` - Conjunctive refinement: all children must be achieved (icon: AND circle)
- `OrJunctor` - Disjunctive refinement: at least one child must be achieved (icon: OR circle)

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

**CRT Edge Types:**
CRT has many edge types connecting causes to effects. The graph flows bottom-to-top (causes at bottom, effects at top).

*From effects to effects:*
- `undesirable_causes_undesirable`, `undesirable_causes_intermediate`, `undesirable_causes_desirable`
- `intermediate_causes_undesirable`, `intermediate_causes_intermediate`, `intermediate_causes_desirable`
- `desirable_causes_undesirable`, `desirable_causes_intermediate`, `desirable_causes_desirable`

*From Given/Changeable to effects:*
- `given_causes_undesirable`, `given_causes_intermediate`, `given_causes_desirable`
- `changeable_causes_undesirable`, `changeable_causes_intermediate`, `changeable_causes_desirable`

*To/From Junctors:*
- `*_to_and_junctor`, `*_to_or_junctor` - Connect any type to junctors
- `and_junctor_causes_*`, `or_junctor_causes_*` - Connect junctors to effects

**FRT Edge Types:**
FRT shares the same edge types as CRT. The graph flows bottom-to-top (solutions at bottom, desired effects at top).

*From Changeable/Given to effects (typical starting points in FRT):*
- `changeable_causes_undesirable`, `changeable_causes_intermediate`, `changeable_causes_desirable`
- `given_causes_undesirable`, `given_causes_intermediate`, `given_causes_desirable`

*Between effects:*
- `intermediate_causes_undesirable`, `intermediate_causes_intermediate`, `intermediate_causes_desirable`
- `desirable_causes_*`, `undesirable_causes_*`

*To/From Junctors:*
- `*_to_and_junctor`, `*_to_or_junctor` - Connect any type to junctors
- `and_junctor_causes_*`, `or_junctor_causes_*` - Connect junctors to effects

**PRT Edge Types:**
PRT uses edges to show how obstacles block objectives and how intermediate objectives overcome obstacles. The graph flows bottom-to-top (intermediate objectives at bottom, main objective at top).

*Obstacle blocking relationships:*
- `obstacle_blocks_objective` - Connects Obstacle → Objective
- `obstacle_blocks_intermediate_objective` - Connects Obstacle → IntermediateObjective

*Intermediate objective relationships:*
- `intermediate_objective_overcomes_obstacle` - Connects IntermediateObjective → Obstacle
- `intermediate_objective_to_objective` - Connects IntermediateObjective → Objective (direct path)

*To/From OR Junctor:*
- `obstacle_to_or`, `intermediate_objective_to_or` - Connect to OR junctor
- `or_to_objective`, `or_to_intermediate_objective`, `or_to_obstacle` - Connect from OR junctor

**TRT Edge Types:**
TRT shares similar edge types with CRT/FRT but focuses on action planning. The graph flows bottom-to-top (actions at bottom, desired effects at top).

*From Changeable/Given to effects (typical starting points for actions):*
- `changeable_causes_undesirable`, `changeable_causes_intermediate`, `changeable_causes_desirable`
- `given_causes_undesirable`, `given_causes_intermediate`, `given_causes_desirable`

*Between effects:*
- `intermediate_causes_undesirable`, `intermediate_causes_intermediate`, `intermediate_causes_desirable`
- `desirable_causes_*`, `undesirable_causes_*`

*To/From And Junctor:*
- `*_to_and_junctor` - Connect any type to And junctor
- `and_junctor_causes_*` - Connect And junctor to effects (excluding And)

**ADTree Edge Types:**
ADTree uses two kinds of edges: refinement edges (solid lines) for same-type decomposition, and countermeasure edges (dotted lines) for opposite-type countering. The graph flows top-to-bottom (root goal at top).

*Refinement edges (solid):*
- `attack_refines_attack` - Decompose an attack into sub-attacks
- `defense_refines_defense` - Decompose a defense into sub-defenses

*Countermeasure edges (dotted):*
- `defense_counters_attack` - A defense that mitigates an attack
- `attack_counters_defense` - An attack that circumvents a defense

*To/From Junctors:*
- `attack_to_and_junctor`, `defense_to_and_junctor` - Connect to AND junctor
- `and_junctor_to_attack`, `and_junctor_to_defense` - Connect from AND junctor
- `attack_to_or_junctor`, `defense_to_or_junctor` - Connect to OR junctor
- `or_junctor_to_attack`, `or_junctor_to_defense` - Connect from OR junctor

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
                 // Built-in notations: IBIS, BBS, ImpactMapping, ConceptMap, CRT, FRT, PRT, TRT, ADTree

statement    ::= group | node | edge | attribute

group        ::= "group" identifier label? "{" statement* "}" ";"?

node         ::= "node" identifier ":" identifier label? attributes? ";"?

edge         ::= "edge" identifier "->" identifier (":" identifier)? label? attributes? ";"?

attribute    ::= identifier ":" value ";"?

attributes   ::= "[" (attribute (";" | ",")?)* "]"

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
6. **Semicolons**: Optional after nodes, edges, groups, and standalone attributes
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

### Example 11: Current Reality Tree (CRT)

A root cause analysis graph showing how causes lead to undesirable effects:

```vgl
vgraph salesDecline: CRT "Sales Decline Analysis" {
    // Undesirable Effects (problems at the top)
    node ude1: UndesirableEffect "Sales revenue declining";
    node ude2: UndesirableEffect "Customer complaints increasing";
    node ude3: UndesirableEffect "Market share decreasing";

    // Intermediate Effects (neutral outcomes in the causal chain)
    node ie1: IntermediateEffect "Customers switching to competitors";
    node ie2: IntermediateEffect "Product perceived as outdated";
    node ie3: IntermediateEffect "Support response time is slow";

    // Desirable Effects (things we want to keep)
    node de1: DesirableEffect "Brand reputation still strong";

    // Given (unchangeable facts at the bottom)
    node g1: Given "Market is highly competitive";
    node g2: Given "Customer expectations keep rising";

    // Changeable (root causes we can address)
    node c1: Changeable "Product development cycle is too long";
    node c2: Changeable "Support team is understaffed";
    node c3: Changeable "No customer feedback loop";

    // Junctors for combining conditions
    node and1: AndJunctor "";
    node or1: OrJunctor "";

    // Root causes leading to intermediate effects
    edge c1 -> ie2: changeable_causes_intermediate;
    edge c3 -> ie2: changeable_causes_intermediate;
    edge c2 -> ie3: changeable_causes_intermediate;

    // Given facts contributing to situation
    edge g1 -> ie1: given_causes_intermediate;
    edge g2 -> and1: given_to_and_junctor;
    edge ie2 -> and1: intermediate_to_and_junctor;

    // And junctor combining conditions
    edge and1 -> ie1: and_junctor_causes_intermediate;

    // Or junctor for alternative paths
    edge ie1 -> or1: intermediate_to_or_junctor;
    edge ie3 -> or1: intermediate_to_or_junctor;

    // Intermediate effects leading to undesirable effects
    edge or1 -> ude2: or_junctor_causes_undesirable;
    edge ie1 -> ude1: intermediate_causes_undesirable;
    edge ie1 -> ude3: intermediate_causes_undesirable;

    // Brand reputation affected but still positive
    edge ie2 -> de1: intermediate_causes_desirable;
}
```

**Note**: CRT graphs flow bottom-to-top, with root causes (Given and Changeable) at the bottom and Undesirable Effects at the top. The AndJunctor indicates multiple conditions must be true together, while OrJunctor indicates any one of the conditions is sufficient. Labels for junctors are typically empty as the icon conveys the meaning.

### Example 12: Future Reality Tree (FRT)

A solution validation graph showing how proposed solutions lead to desired outcomes:

```vgl
vgraph salesSolution: FRT "Sales Improvement Plan" {
    // Changeable nodes (injections/solutions we will implement)
    node c1: Changeable "Implement agile product development";
    node c2: Changeable "Hire additional support staff";
    node c3: Changeable "Create customer feedback system";

    // Given (unchangeable facts that still apply)
    node g1: Given "Market is highly competitive";
    node g2: Given "Customer expectations keep rising";

    // Intermediate Effects (expected outcomes from our solutions)
    node ie1: IntermediateEffect "Faster product iterations";
    node ie2: IntermediateEffect "Products match customer needs";
    node ie3: IntermediateEffect "Support response time improves";
    node ie4: IntermediateEffect "Customer feedback drives development";

    // Junctors for combining conditions
    node and1: AndJunctor "";
    node or1: OrJunctor "";

    // Desirable Effects (the goals we want to achieve)
    node de1: DesirableEffect "Sales revenue increasing";
    node de2: DesirableEffect "Customer satisfaction high";
    node de3: DesirableEffect "Market share growing";

    // Potential negative side effects (to monitor)
    node ude1: UndesirableEffect "Initial implementation costs";

    // Solutions leading to intermediate effects
    edge c1 -> ie1: changeable_causes_intermediate;
    edge c3 -> ie4: changeable_causes_intermediate;
    edge c2 -> ie3: changeable_causes_intermediate;

    // Given facts combining with solutions
    edge g2 -> and1: given_to_and_junctor;
    edge ie4 -> and1: intermediate_to_and_junctor;

    // And junctor combining conditions
    edge and1 -> ie2: and_junctor_causes_intermediate;

    // Multiple paths can lead to customer satisfaction
    edge ie2 -> or1: intermediate_to_or_junctor;
    edge ie3 -> or1: intermediate_to_or_junctor;

    // Intermediate effects leading to desirable effects
    edge or1 -> de2: or_junctor_causes_desirable;
    edge ie1 -> de3: intermediate_causes_desirable;
    edge ie2 -> de1: intermediate_causes_desirable;
    edge ie2 -> de3: intermediate_causes_desirable;

    // Acknowledging potential downsides
    edge c1 -> ude1: changeable_causes_undesirable;
    edge c2 -> ude1: changeable_causes_undesirable;

    // Given competitive market affects outcomes
    edge g1 -> ie2: given_causes_intermediate;
}
```

**Note**: FRT graphs also flow bottom-to-top like CRT, but with a different focus. While CRT starts with problems (Undesirable Effects) and traces back to root causes, FRT starts with proposed solutions (Changeable/injections) and traces forward to show how they achieve desired outcomes. This makes FRT ideal for validating that proposed changes will actually deliver the expected benefits.

### Example 13: Prerequisite Tree (PRT)

A planning graph showing obstacles blocking objectives and intermediate objectives to overcome them:

```vgl
vgraph projectLaunch: PRT "New Product Launch Planning" {
    // The main objective we want to achieve
    node obj1: Objective "Successfully launch product by Q3";

    // Obstacles blocking the main objective
    node obs1: Obstacle "Development team lacks required skills";
    node obs2: Obstacle "Marketing budget not approved";
    node obs3: Obstacle "No distribution channel established";

    // Intermediate objectives to overcome obstacles
    node io1: IntermediateObjective "Train team on new technology";
    node io2: IntermediateObjective "Hire experienced developers";
    node io3: IntermediateObjective "Present ROI analysis to leadership";
    node io4: IntermediateObjective "Partner with existing retailer";
    node io5: IntermediateObjective "Build direct-to-consumer channel";

    // OR junctor for alternative paths
    node or1: OR;
    node or2: OR;

    // Further obstacles blocking intermediate objectives
    node obs4: Obstacle "Training budget limited";
    node obs5: Obstacle "Talent pool is competitive";

    // Obstacles block the main objective
    edge obs1 -> obj1: obstacle_blocks_objective;
    edge obs2 -> obj1: obstacle_blocks_objective;
    edge obs3 -> obj1: obstacle_blocks_objective;

    // Alternative ways to overcome skill obstacle (via OR)
    edge io1 -> or1: intermediate_objective_to_or;
    edge io2 -> or1: intermediate_objective_to_or;
    edge or1 -> obs1: or_to_obstacle;

    // ROI analysis overcomes budget obstacle
    edge io3 -> obs2: intermediate_objective_overcomes_obstacle;

    // Alternative distribution solutions
    edge io4 -> or2: intermediate_objective_to_or;
    edge io5 -> or2: intermediate_objective_to_or;
    edge or2 -> obs3: or_to_obstacle;

    // Recursive obstacles blocking intermediate objectives
    edge obs4 -> io1: obstacle_blocks_intermediate_objective;
    edge obs5 -> io2: obstacle_blocks_intermediate_objective;
}
```

**Note**: PRT graphs flow bottom-to-top like other TOC tools. The main Objective sits at the top, with Obstacles directly below showing what blocks it. IntermediateObjectives below the obstacles show what needs to be achieved to overcome them. The OR junctor indicates alternative paths - only one of the connected intermediate objectives needs to be achieved. PRT embodies "necessary condition thinking" - working backward from the goal to identify all prerequisites.

### Example 14: Transition Tree (TRT)

A step-by-step implementation planning graph showing how actions lead to desired outcomes:

```vgl
vgraph agileTransition: TRT "Agile Transformation Implementation" {
    // Given conditions (the context we're working within)
    node g1: Given "Company has 5 development teams";
    node g2: Given "Current waterfall process causes delays";

    // Changeable causes (actions we will take)
    node c1: Changeable "Introduce daily standups";
    node c2: Changeable "Implement CI/CD pipeline";
    node c3: Changeable "Create cross-functional teams";
    node c4: Changeable "Train teams on Scrum practices";

    // Intermediate effects (stepping stones from actions)
    node ie1: IntermediateEffect "Teams communicate more frequently";
    node ie2: IntermediateEffect "Code integration happens daily";
    node ie3: IntermediateEffect "Teams have diverse skillsets";
    node ie4: IntermediateEffect "Teams follow iterative process";
    node ie5: IntermediateEffect "Silos are broken down";

    // And junctors for combined conditions
    node and1: AndJunctor "";
    node and2: AndJunctor "";

    // Desirable effects (the goals we achieve)
    node de1: DesirableEffect "Faster time to market";
    node de2: DesirableEffect "Higher quality releases";
    node de3: DesirableEffect "Better team collaboration";

    // Actions lead to intermediate effects
    edge c1 -> ie1: changeable_causes_intermediate;
    edge c2 -> ie2: changeable_causes_intermediate;
    edge c3 -> ie3: changeable_causes_intermediate;
    edge c4 -> ie4: changeable_causes_intermediate;

    // Given context combines with cross-functional teams
    edge g1 -> and1: given_to_and_junctor;
    edge ie3 -> and1: intermediate_to_and_junctor;
    edge and1 -> ie5: and_junctor_causes_intermediate;

    // Breaking silos leads to collaboration
    edge ie5 -> de3: intermediate_causes_desirable;

    // Communication helps collaboration too
    edge ie1 -> de3: intermediate_causes_desirable;

    // CI/CD + iterative process combine for quality
    edge ie2 -> and2: intermediate_to_and_junctor;
    edge ie4 -> and2: intermediate_to_and_junctor;
    edge and2 -> de2: and_junctor_causes_desirable;

    // Quality and collaboration lead to speed
    edge de2 -> de1: desirable_causes_desirable;
    edge de3 -> de1: desirable_causes_desirable;

    // Given waterfall context is addressed by iterative process
    edge g2 -> ie4: given_causes_intermediate;
}
```

**Note**: TRT graphs flow bottom-to-top like other TOC tools. The focus is on detailed implementation planning - answering "HOW TO CAUSE the change?" Unlike FRT which validates that solutions will work, TRT provides the step-by-step action sequence needed to implement those solutions. Changeable nodes represent the specific actions to take, and the graph shows how those actions combine through intermediate effects to achieve desirable outcomes. The AndJunctor indicates multiple conditions must occur together for an effect.

### Example 15: Attack-Defense Tree (ADTree)

A security modelling graph showing how defenses protect a system and how attacks can circumvent them. Based on the data confidentiality scenario from Kordy et al. (2014):

```vgl
vgraph dataConfidentiality: ADTree "Data Confidentiality" {
    // Defense nodes (defender's goals)
    node dataConf: Defense "Data Confidentiality";
    node networkSec: Defense "Network Security";
    node physicalSec: Defense "Physical Security";
    node accessControl: Defense "Access Control";
    node passwords: Defense "Passwords";
    node strongPasswords: Defense "Strong Passwords";
    node lock1: Defense "Lock";
    node screening: Defense "Screening";
    node securityGuard: Defense "Security Guard";
    node videoCameras: Defense "Video Cameras";

    // Attack nodes (attacker's goals)
    node employeeAttack: Attack "Employee Attack";
    node breakIn: Attack "Break In";
    node corruption: Attack "Corruption";
    node socialEngineering: Attack "Social Engineering";
    node dictionaryAttack: Attack "Dictionary Attack";
    node backDoor: Attack "Back Door";
    node defeatLock: Attack "Defeat Lock";
    node forceOpen: Attack "Force Open";
    node acquireKeys: Attack "Acquire Keys";
    node defeatGuard: Attack "Defeat Guard";
    node bribe: Attack "Bribe";
    node overpower: Attack "Overpower";
    node stealKeys: Attack "Steal Keys";
    node outnumber: Attack "Outnumber";
    node useWeapons: Attack "Use Weapons";

    // AND junctors for conjunctive refinement
    node andDataConf: AndJunctor;
    node andOverpower: AndJunctor;

    // Defense refines into sub-defenses via AND junctor (both required)
    edge networkSec -> andDataConf: defense_to_and_junctor;
    edge physicalSec -> andDataConf: defense_to_and_junctor;
    edge andDataConf -> dataConf: and_junctor_to_defense;
    edge accessControl -> networkSec: defense_refines_defense;
    edge passwords -> accessControl: defense_refines_defense;

    // Attack refines into sub-attacks (solid edges)
    edge corruption -> employeeAttack: attack_refines_attack;
    edge socialEngineering -> employeeAttack: attack_refines_attack;
    edge backDoor -> breakIn: attack_refines_attack;
    edge forceOpen -> defeatLock: attack_refines_attack;
    edge acquireKeys -> defeatLock: attack_refines_attack;
    edge bribe -> defeatGuard: attack_refines_attack;
    edge overpower -> defeatGuard: attack_refines_attack;
    edge stealKeys -> defeatGuard: attack_refines_attack;

    // Countermeasure: defense counters attack (dotted edges)
    edge strongPasswords -> dictionaryAttack: defense_counters_attack;
    edge lock1 -> backDoor: defense_counters_attack;
    edge screening -> corruption: defense_counters_attack;
    edge securityGuard -> breakIn: defense_counters_attack;
    edge videoCameras -> defeatGuard: defense_counters_attack;

    // Countermeasure: attack counters defense (dotted edges)
    edge employeeAttack -> dataConf: attack_counters_defense;
    edge breakIn -> physicalSec: attack_counters_defense;
    edge dictionaryAttack -> passwords: attack_counters_defense;
    edge defeatLock -> lock1: attack_counters_defense;
    edge defeatGuard -> securityGuard: attack_counters_defense;

    // AND junctor: conjunctive refinement
    edge outnumber -> andOverpower: attack_to_and_junctor;
    edge useWeapons -> andOverpower: attack_to_and_junctor;
    edge andOverpower -> overpower: and_junctor_to_attack;
}
```

**Note**: ADTree graphs flow bottom-to-top with the root goal at the top and leaf actions at the bottom. The key feature is the distinction between refinement edges (solid lines for same-type decomposition) and countermeasure edges (dotted lines for opposite-type countering). This allows modelling the ongoing arms race between attacker and defender at any level of the tree. The root node can be either an Attack or Defense node, determining whether the proponent is the attacker or defender.

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
