// ─── USER-SCOPED STORAGE ─────────────────────────────────────────────────────
// All progress data is keyed under the logged-in user's ID so that different
// accounts on the same browser never share completion state.
//
// How it works:
//   storage.setUserId("abc123")  — call this on login/signup with user.id
//   storage.clearUserId()        — call this on logout
//   storage.get("dsa_arrays")    — internally reads "u:abc123:dsa_arrays"
//
// Because React components read storage at render time, switching user
// automatically shows the correct data without any extra work.

let _uid = (() => {
  try { const s = localStorage.getItem("ip_user"); return s ? JSON.parse(s).id || "" : ""; }
  catch { return ""; }
})();

export const storage = {
  setUserId: (id) => { _uid = id || ""; },
  clearUserId: () => { _uid = ""; },
  _k: (key) => _uid ? `u:${_uid}:${key}` : `guest:${key}`,
  get(key, fallback = null) {
    try { const v = localStorage.getItem(this._k(key)); return v !== null ? JSON.parse(v) : fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(this._k(key), JSON.stringify(value)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(this._k(key)); } catch {}
  },
};

// ─── DSA DATA ───────────────────────────────────────────────────────────────
export const DSA_TOPICS = [
  {
    id: "arrays", name: "Arrays & Strings", icon: "⬡", color: "#6EE7B7", accent: "#059669",
    questions: [
      { id: 1, title: "Search in a Sorted 2D Matrix", link: "https://leetcode.com/problems/search-a-2d-matrix/", difficulty: "Medium" },
      { id: 2, title: "Grid Unique Paths", link: "https://leetcode.com/problems/unique-paths/", difficulty: "Medium" },
      { id: 3, title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy" },
      { id: 4, title: "Longest Consecutive Sequence", link: "https://leetcode.com/problems/longest-consecutive-sequence/", difficulty: "Medium" },
      { id: 5, title: "Longest Subarray with Zero Sum", link: "https://practice.geeksforgeeks.org/problems/largest-subarray-with-0-sum/1", difficulty: "Medium" },
      { id: 6, title: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium" },
      { id: 7, title: "Count Subarrays with XOR = K", link: "https://www.interviewbit.com/problems/subarray-with-given-xor/", difficulty: "Hard" },
      { id: 8, title: "Merge Overlapping Intervals", link: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium" },
      { id: 9, title: "Merge Two Sorted Arrays Without Extra Space", link: "https://leetcode.com/problems/merge-sorted-array/", difficulty: "Easy" },
      { id: 10, title: "Pascal's Triangle", link: "https://leetcode.com/problems/pascals-triangle/", difficulty: "Easy" },
      { id: 11, title: "Next Permutation", link: "https://leetcode.com/problems/next-permutation/", difficulty: "Medium" },
      { id: 12, title: "Kadane's Algorithm – Maximum Subarray Sum", link: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium" },
      { id: 13, title: "Sort 0s, 1s and 2s", link: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium" },
      { id: 14, title: "Reverse Pairs", link: "https://leetcode.com/problems/reverse-pairs/", difficulty: "Hard" },
      { id: 15, title: "Pow(x, n)", link: "https://leetcode.com/problems/powx-n/", difficulty: "Medium" },
      { id: 16, title: "4 Sum Problem", link: "https://leetcode.com/problems/4sum/", difficulty: "Medium" },
      { id: 17, title: "Max Consecutive Ones", link: "https://leetcode.com/problems/max-consecutive-ones/", difficulty: "Easy" },
      { id: 18, title: "Reverse Words in a String", link: "https://leetcode.com/problems/reverse-words-in-a-string/", difficulty: "Medium" },
      { id: 19, title: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium" },
      { id: 20, title: "Longest Common Prefix", link: "https://leetcode.com/problems/longest-common-prefix/", difficulty: "Easy" },
      { id: 21, title: "Minimum Insertions to Make Palindrome", link: "https://www.codingninjas.com/codestudio/problems/893000", difficulty: "Hard" },
      { id: 22, title: "Check for Anagrams", link: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy" },
    ],
  },
  {
    id: "greedy", name: "Greedy", icon: "◈", color: "#FCA5A5", accent: "#DC2626",
    questions: [
      { id: 1, title: "N Meetings in One Room", link: "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1", difficulty: "Easy" },
      { id: 2, title: "Minimum Platforms for Railway", link: "https://practice.geeksforgeeks.org/problems/minimum-platforms-1587115620/1#", difficulty: "Medium" },
      { id: 3, title: "Job Sequencing Problem", link: "https://practice.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1#", difficulty: "Medium" },
      { id: 4, title: "Fractional Knapsack", link: "https://practice.geeksforgeeks.org/problems/fractional-knapsack-1587115620/1", difficulty: "Medium" },
      { id: 5, title: "Find Minimum Number of Coins", link: "https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/", difficulty: "Easy" },
    ],
  },
  {
    id: "dp", name: "Dynamic Programming", icon: "◫", color: "#C4B5FD", accent: "#7C3AED",
    questions: [
      { id: 1, title: "Maximum Product Subarray", link: "https://leetcode.com/problems/maximum-product-subarray/", difficulty: "Medium" },
      { id: 2, title: "Longest Common Subsequence", link: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "Medium" },
      { id: 3, title: "0/1 Knapsack", link: "https://practice.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1", difficulty: "Medium" },
      { id: 4, title: "Edit Distance", link: "https://leetcode.com/problems/edit-distance/", difficulty: "Hard" },
      { id: 5, title: "Rod Cutting Problem", link: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/", difficulty: "Hard" },
      { id: 6, title: "Subset Sum Equal to Target", link: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "Medium" },
      { id: 7, title: "Coin Change", link: "https://leetcode.com/problems/coin-change/", difficulty: "Medium" },
      { id: 8, title: "Minimum Path Sum in a Grid", link: "https://leetcode.com/problems/minimum-path-sum/", difficulty: "Medium" },
      { id: 9, title: "Longest Increasing Subsequence", link: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "Medium" },
      { id: 10, title: "Maximum Sum Increasing Subsequence", link: "https://practice.geeksforgeeks.org/problems/maximum-sum-increasing-subsequence4749/1", difficulty: "Medium" },
      { id: 11, title: "Matrix Chain Multiplication", link: "https://practice.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1", difficulty: "Hard" },
      { id: 12, title: "Minimum Sum Path in Matrix", link: "https://leetcode.com/problems/minimum-path-sum/", difficulty: "Medium" },
      { id: 13, title: "Maximum Profit in Job Scheduling", link: "https://leetcode.com/problems/maximum-profit-in-job-scheduling/", difficulty: "Hard" },
    ],
  },
  {
    id: "binarysearch", name: "Binary Search", icon: "⌖", color: "#FDE68A", accent: "#D97706",
    questions: [
      { id: 1, title: "Nth Root of a Number", link: "https://bit.ly/3rj7Ib1", difficulty: "Medium" },
      { id: 2, title: "Single Element in a Sorted Array", link: "https://leetcode.com/problems/single-element-in-a-sorted-array/", difficulty: "Medium" },
      { id: 3, title: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium" },
      { id: 4, title: "Median of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "Hard" },
      { id: 5, title: "K-th Element of Two Sorted Arrays", link: "https://practice.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1", difficulty: "Medium" },
      { id: 6, title: "Allocate Minimum Number of Pages", link: "https://www.interviewbit.com/problems/allocate-books/", difficulty: "Hard" },
      { id: 7, title: "Aggressive Cows", link: "https://www.spoj.com/problems/AGGRCOW/", difficulty: "Hard" },
    ],
  },
  {
    id: "heaps", name: "Heaps", icon: "△", color: "#FBB6CE", accent: "#DB2777",
    questions: [
      { id: 1, title: "Maximum Sum Combination", link: "https://www.interviewbit.com/problems/maximum-sum-combinations/", difficulty: "Medium" },
      { id: 2, title: "Kth Largest Element", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium" },
      { id: 3, title: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium" },
      { id: 4, title: "Merge K Sorted Arrays", link: "https://www.codingninjas.com/codestudio/problems/merge-k-sorted-arrays_975379", difficulty: "Hard" },
      { id: 5, title: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard" },
    ],
  },
  {
    id: "recursion", name: "Recursion", icon: "↺", color: "#A5F3FC", accent: "#0891B2",
    questions: [
      { id: 1, title: "Subset Sum – Sum of all Subsets", link: "https://practice.geeksforgeeks.org/problems/subset-sums2234/1", difficulty: "Medium" },
      { id: 2, title: "Print all Unique Subsets", link: "https://leetcode.com/problems/subsets-ii/", difficulty: "Medium" },
      { id: 3, title: "Combination Sum I", link: "https://leetcode.com/problems/combination-sum/", difficulty: "Medium" },
      { id: 4, title: "Combination Sum II", link: "https://leetcode.com/problems/combination-sum-ii/", difficulty: "Medium" },
      { id: 5, title: "Palindrome Partitioning", link: "https://leetcode.com/problems/palindrome-partitioning/", difficulty: "Medium" },
      { id: 6, title: "K-th Permutation Sequence", link: "https://leetcode.com/problems/permutation-sequence/", difficulty: "Hard" },
    ],
  },
  {
    id: "linkedlist", name: "Linked List", icon: "⇒", color: "#6EE7B7", accent: "#047857",
    questions: [
      { id: 1, title: "Check if Linked List is Palindrome", link: "https://leetcode.com/problems/palindrome-linked-list/", difficulty: "Easy" },
      { id: 2, title: "Reverse Linked List in Groups of K", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/", difficulty: "Hard" },
      { id: 3, title: "Detect a Cycle in a Linked List", link: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "Easy" },
      { id: 4, title: "Find Intersection of Two Linked Lists", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/", difficulty: "Easy" },
      { id: 5, title: "Starting Point of Loop in Linked List", link: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "Medium" },
      { id: 6, title: "Flattening a Linked List", link: "https://practice.geeksforgeeks.org/problems/flattening-a-linked-list/1", difficulty: "Medium" },
      { id: 7, title: "Merge Two Sorted Linked Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy" },
      { id: 8, title: "Remove N-th Node from End", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium" },
    ],
  },
  {
    id: "binarytree", name: "Binary Tree", icon: "⑂", color: "#FDE68A", accent: "#B45309",
    questions: [
      { id: 1, title: "Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium" },
      { id: 2, title: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy" },
      { id: 3, title: "Diameter of Binary Tree", link: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "Easy" },
      { id: 4, title: "Check Balanced Binary Tree", link: "https://leetcode.com/problems/balanced-binary-tree/", difficulty: "Easy" },
      { id: 5, title: "Lowest Common Ancestor", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium" },
      { id: 6, title: "Check if Two Trees are Identical", link: "https://leetcode.com/problems/same-tree/", difficulty: "Easy" },
      { id: 7, title: "Boundary Traversal", link: "https://leetcode.com/problems/boundary-of-binary-tree/", difficulty: "Medium" },
      { id: 8, title: "Zigzag Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", difficulty: "Medium" },
    ],
  },
  {
    id: "bst", name: "Binary Search Tree", icon: "⍜", color: "#C4B5FD", accent: "#5B21B6",
    questions: [
      { id: 1, title: "Size of Largest BST in a Binary Tree", link: "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/", difficulty: "Hard" },
      { id: 2, title: "Find a Pair with Given Sum in BST", link: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", difficulty: "Easy" },
      { id: 3, title: "Populate Next Right Pointers", link: "https://leetcode.com/problems/populating-next-right-pointers-in-each-node/", difficulty: "Medium" },
      { id: 4, title: "Find LCA of Two Nodes in BST", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium" },
      { id: 5, title: "Inorder Predecessor/Successor in BST", link: "https://practice.geeksforgeeks.org/problems/predecessor-and-successor/1", difficulty: "Medium" },
      { id: 6, title: "Kth Largest Element in BST", link: "https://practice.geeksforgeeks.org/problems/kth-largest-element-in-bst/1", difficulty: "Medium" },
    ],
  },
  {
    id: "stackqueue", name: "Stack & Queue", icon: "⊟", color: "#A5F3FC", accent: "#0E7490",
    questions: [
      { id: 1, title: "Implement Min Stack", link: "https://leetcode.com/problems/min-stack/", difficulty: "Medium" },
      { id: 2, title: "Sliding Window Maximum", link: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard" },
      { id: 3, title: "Largest Rectangle in Histogram", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "Hard" },
      { id: 4, title: "Implement LRU Cache", link: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium" },
      { id: 5, title: "Implement Stack using Single Queue", link: "https://leetcode.com/problems/implement-stack-using-queues/", difficulty: "Medium" },
      { id: 6, title: "Check Balanced Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy" },
      { id: 7, title: "Next Greater Element", link: "https://leetcode.com/problems/next-greater-element-ii/", difficulty: "Medium" },
    ],
  },
  {
    id: "backtracking", name: "Backtracking", icon: "↩", color: "#FBB6CE", accent: "#BE185D",
    questions: [
      { id: 1, title: "Rat in a Maze", link: "https://practice.geeksforgeeks.org/problems/rat-in-a-maze-problem/1", difficulty: "Medium" },
      { id: 2, title: "M-Coloring Problem", link: "https://practice.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1#", difficulty: "Medium" },
      { id: 3, title: "Sudoku Solver", link: "https://leetcode.com/problems/sudoku-solver/", difficulty: "Hard" },
      { id: 4, title: "N-Queens Problem", link: "https://leetcode.com/problems/n-queens/", difficulty: "Hard" },
      { id: 5, title: "Print All Permutations", link: "https://leetcode.com/problems/permutations/", difficulty: "Medium" },
      { id: 6, title: "Word Break (all ways)", link: "https://bit.ly/3FxgW92", difficulty: "Hard" },
    ],
  },
  {
    id: "graphs", name: "Graphs", icon: "◎", color: "#FCA5A5", accent: "#B91C1C",
    questions: [
      { id: 1, title: "Detect Cycle in Undirected Graph (BFS)", link: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium" },
      { id: 2, title: "Topological Sort (BFS / Kahn's)", link: "https://practice.geeksforgeeks.org/problems/topological-sort/1", difficulty: "Medium" },
      { id: 3, title: "Number of Distinct Islands", link: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium" },
      { id: 4, title: "Bipartite Graph Check", link: "https://leetcode.com/problems/is-graph-bipartite/", difficulty: "Medium" },
      { id: 5, title: "Detect Cycle in Directed Graph", link: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium" },
      { id: 6, title: "Dijkstra's Shortest Path", link: "https://practice.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1", difficulty: "Medium" },
    ],
  },
];

// ─── SYSTEM DESIGN DATA ─────────────────────────────────────────────────────
export const SYSTEM_DESIGN_TOPICS = [
  {
    id: "sd_fundamentals", name: "Core Fundamentals", icon: "⬡",
    topics: [
      { id: 1, title: "Scalability – Horizontal vs Vertical Scaling", link: "https://www.educative.io/blog/horizontal-vs-vertical-scaling-cloud-computing", done: false },
      { id: 2, title: "Load Balancing – Algorithms & Types", link: "https://www.nginx.com/resources/glossary/load-balancing/", done: false },
      { id: 3, title: "CAP Theorem – Consistency, Availability, Partition Tolerance", link: "https://www.ibm.com/topics/cap-theorem", done: false },
      { id: 4, title: "SQL vs NoSQL – When to use which", link: "https://www.mongodb.com/nosql-explained/nosql-vs-sql", done: false },
      { id: 5, title: "Caching – Redis, Memcached, Cache Invalidation", link: "https://redis.io/learn", done: false },
      { id: 6, title: "CDN – Content Delivery Networks", link: "https://www.cloudflare.com/learning/cdn/what-is-a-cdn/", done: false },
      { id: 7, title: "Message Queues – Kafka, RabbitMQ", link: "https://kafka.apache.org/documentation/", done: false },
      { id: 8, title: "Microservices vs Monolith Architecture", link: "https://microservices.io/", done: false },
    ],
  },
  {
    id: "sd_designs", name: "Classic System Designs", icon: "◫",
    topics: [
      { id: 1, title: "Design URL Shortener (Bit.ly)", link: "https://www.designgurus.io/blog/url-shortening", done: false },
      { id: 2, title: "Design Twitter / News Feed System", link: "https://www.designgurus.io/blog/design-twitter", done: false },
      { id: 3, title: "Design WhatsApp / Chat System", link: "https://systemdesign.one/whatsapp-system-design/", done: false },
      { id: 4, title: "Design YouTube / Video Streaming", link: "https://www.designgurus.io/blog/design-youtube", done: false },
      { id: 5, title: "Design Uber / Ride-Sharing System", link: "https://www.designgurus.io/blog/uber-system-design", done: false },
      { id: 6, title: "Design Amazon / E-Commerce Platform", link: "https://www.designgurus.io/blog/amazon-system-design", done: false },
      { id: 7, title: "Design Google Search Engine", link: "https://www.designgurus.io/blog/google-search-system-design", done: false },
      { id: 8, title: "Design Netflix / Recommendation System", link: "https://netflixtechblog.com/", done: false },
      { id: 9, title: "Design Instagram / Photo Sharing", link: "https://www.designgurus.io/blog/instagram-system-design", done: false },
      { id: 10, title: "Design Distributed Cache (Redis)", link: "https://systemdesign.one/distributed-cache-system-design/", done: false },
    ],
  },
  {
    id: "sd_advanced", name: "Advanced Concepts", icon: "◈",
    topics: [
      { id: 1, title: "Consistent Hashing", link: "https://www.toptal.com/big-data/consistent-hashing", done: false },
      { id: 2, title: "Database Sharding & Partitioning", link: "https://www.digitalocean.com/community/tutorials/understanding-database-sharding", done: false },
      { id: 3, title: "Rate Limiting Algorithms", link: "https://www.figma.com/blog/an-alternative-approach-to-rate-limiting/", done: false },
      { id: 4, title: "Distributed Transactions & ACID vs BASE", link: "https://www.ibm.com/topics/acid-transactions", done: false },
      { id: 5, title: "Event-Driven Architecture", link: "https://aws.amazon.com/event-driven-architecture/", done: false },
      { id: 6, title: "API Gateway & Service Mesh", link: "https://www.nginx.com/learn/api-gateway/", done: false },
    ],
  },
];

// ─── CS FUNDAMENTALS DATA ───────────────────────────────────────────────────
export const CS_FUNDAMENTALS = [
  {
    id: "os", name: "Operating Systems", icon: "⚙", color: "#FCD34D",
    topics: [
      { id: 1, title: "Process vs Thread – Differences & Lifecycle", link: "https://www.geeksforgeeks.org/difference-between-process-and-thread/", difficulty: "Medium" },
      { id: 2, title: "CPU Scheduling Algorithms (FCFS, SJF, Round Robin)", link: "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/", difficulty: "Medium" },
      { id: 3, title: "Deadlock – Conditions, Prevention, Banker's Algorithm", link: "https://www.geeksforgeeks.org/deadlock-in-operating-system/", difficulty: "Hard" },
      { id: 4, title: "Memory Management – Paging, Segmentation, Virtual Memory", link: "https://www.geeksforgeeks.org/memory-management-in-operating-system/", difficulty: "Hard" },
      { id: 5, title: "Semaphores & Mutex – Synchronization", link: "https://www.geeksforgeeks.org/semaphores-in-process-synchronization/", difficulty: "Medium" },
      { id: 6, title: "Thrashing & Page Replacement Algorithms", link: "https://www.geeksforgeeks.org/page-replacement-algorithms-in-operating-systems/", difficulty: "Medium" },
      { id: 7, title: "Inter-Process Communication (IPC)", link: "https://www.geeksforgeeks.org/inter-process-communication-ipc/", difficulty: "Medium" },
      { id: 8, title: "File Systems – FAT, NTFS, Inodes", link: "https://www.geeksforgeeks.org/file-system-operating-systems/", difficulty: "Easy" },
    ],
  },
  {
    id: "dbms", name: "DBMS", icon: "⬟", color: "#86EFAC",
    topics: [
      { id: 1, title: "ACID Properties & Transactions", link: "https://www.geeksforgeeks.org/acid-properties-in-dbms/", difficulty: "Medium" },
      { id: 2, title: "SQL Joins – Inner, Outer, Cross, Self", link: "https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/", difficulty: "Easy" },
      { id: 3, title: "Normalization – 1NF, 2NF, 3NF, BCNF", link: "https://www.geeksforgeeks.org/normal-forms-in-dbms/", difficulty: "Medium" },
      { id: 4, title: "Indexing – B-Trees, Hash Index", link: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/", difficulty: "Medium" },
      { id: 5, title: "Transactions – Concurrency Control, Locking", link: "https://www.geeksforgeeks.org/concurrency-control-in-dbms/", difficulty: "Hard" },
      { id: 6, title: "ER Diagrams & Relational Schema", link: "https://www.geeksforgeeks.org/introduction-of-er-model/", difficulty: "Easy" },
      { id: 7, title: "Stored Procedures, Triggers, Views", link: "https://www.geeksforgeeks.org/stored-procedures/", difficulty: "Medium" },
    ],
  },
  {
    id: "cn", name: "Computer Networks", icon: "⌖", color: "#93C5FD",
    topics: [
      { id: 1, title: "OSI Model – 7 Layers Explained", link: "https://www.geeksforgeeks.org/layers-of-osi-model/", difficulty: "Easy" },
      { id: 2, title: "TCP vs UDP – Differences & Use Cases", link: "https://www.geeksforgeeks.org/differences-between-tcp-and-udp/", difficulty: "Easy" },
      { id: 3, title: "HTTP vs HTTPS – How SSL/TLS Works", link: "https://www.cloudflare.com/learning/ssl/why-is-http-not-secure/", difficulty: "Medium" },
      { id: 4, title: "DNS – How Domain Resolution Works", link: "https://www.cloudflare.com/learning/dns/what-is-dns/", difficulty: "Easy" },
      { id: 5, title: "REST vs GraphQL APIs", link: "https://www.redhat.com/en/topics/api/rest-vs-graphql", difficulty: "Medium" },
      { id: 6, title: "WebSockets & Long Polling", link: "https://www.geeksforgeeks.org/what-is-web-socket-and-how-it-is-different-from-the-http/", difficulty: "Medium" },
      { id: 7, title: "IP Addressing, Subnetting, CIDR", link: "https://www.geeksforgeeks.org/ip-addressing-introduction-and-classful-addressing/", difficulty: "Medium" },
      { id: 8, title: "Routing Algorithms – Dijkstra, Bellman-Ford in Networks", link: "https://www.geeksforgeeks.org/network-layer-protocols/", difficulty: "Hard" },
    ],
  },
  {
    id: "oop", name: "OOP Concepts", icon: "⬢", color: "#F9A8D4",
    topics: [
      { id: 1, title: "4 Pillars – Encapsulation, Inheritance, Polymorphism, Abstraction", link: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/", difficulty: "Easy" },
      { id: 2, title: "SOLID Principles with Examples", link: "https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design", difficulty: "Medium" },
      { id: 3, title: "Design Patterns – Singleton, Factory, Observer", link: "https://refactoring.guru/design-patterns", difficulty: "Medium" },
      { id: 4, title: "Abstract Classes vs Interfaces", link: "https://www.geeksforgeeks.org/difference-between-abstract-class-and-interface-in-java/", difficulty: "Easy" },
      { id: 5, title: "Method Overloading vs Overriding", link: "https://www.geeksforgeeks.org/difference-between-method-overloading-and-method-overriding-in-java/", difficulty: "Easy" },
      { id: 6, title: "Composition vs Inheritance", link: "https://www.geeksforgeeks.org/favoring-composition-over-inheritance-in-java-with-examples/", difficulty: "Medium" },
    ],
  },
];

// ─── TECH COURSES DATA ──────────────────────────────────────────────────────
export const TECH_COURSES = [
  {
    id: "react_course", name: "React.js", icon: "⚛", color: "#67E8F9", accent: "#0891B2",
    description: "Master React for frontend interviews",
    modules: [
      { id: 1, title: "JSX, Components & Props", link: "https://react.dev/learn", done: false },
      { id: 2, title: "State & useState Hook", link: "https://react.dev/learn/state-a-components-memory", done: false },
      { id: 3, title: "useEffect & Side Effects", link: "https://react.dev/learn/synchronizing-with-effects", done: false },
      { id: 4, title: "useContext & Context API", link: "https://react.dev/learn/passing-data-deeply-with-context", done: false },
      { id: 5, title: "useReducer for Complex State", link: "https://react.dev/learn/extracting-state-logic-into-a-reducer", done: false },
      { id: 6, title: "useMemo & useCallback – Performance", link: "https://react.dev/reference/react/useMemo", done: false },
      { id: 7, title: "React Router – Navigation & Protected Routes", link: "https://reactrouter.com/en/main", done: false },
      { id: 8, title: "Custom Hooks – Building Your Own", link: "https://react.dev/learn/reusing-logic-with-custom-hooks", done: false },
      { id: 9, title: "Virtual DOM & Reconciliation", link: "https://react.dev/learn/preserving-and-resetting-state", done: false },
      { id: 10, title: "React Query / TanStack Query", link: "https://tanstack.com/query/latest", done: false },
      { id: 11, title: "State Management – Redux Toolkit", link: "https://redux-toolkit.js.org/", done: false },
      { id: 12, title: "Testing React with Jest & RTL", link: "https://testing-library.com/docs/react-testing-library/intro/", done: false },
    ],
  },
  {
    id: "node_course", name: "Node.js & Express", icon: "⬡", color: "#86EFAC", accent: "#15803D",
    description: "Backend development essentials",
    modules: [
      { id: 1, title: "Node.js Event Loop & Non-blocking I/O", link: "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick", done: false },
      { id: 2, title: "Express.js – Routing & Middleware", link: "https://expressjs.com/en/guide/routing.html", done: false },
      { id: 3, title: "RESTful API Design Best Practices", link: "https://restfulapi.net/", done: false },
      { id: 4, title: "Authentication – JWT & Sessions", link: "https://jwt.io/introduction", done: false },
      { id: 5, title: "MongoDB with Mongoose", link: "https://mongoosejs.com/docs/guide.html", done: false },
      { id: 6, title: "Error Handling & Middleware Patterns", link: "https://expressjs.com/en/guide/error-handling.html", done: false },
      { id: 7, title: "File Uploads – Multer", link: "https://www.npmjs.com/package/multer", done: false },
      { id: 8, title: "WebSockets with Socket.io", link: "https://socket.io/docs/v4/", done: false },
      { id: 9, title: "Rate Limiting & Security (Helmet, CORS)", link: "https://helmetjs.github.io/", done: false },
      { id: 10, title: "Environment Variables & Config Management", link: "https://www.npmjs.com/package/dotenv", done: false },
    ],
  },
  {
    id: "python_course", name: "Python", icon: "⬡", color: "#FDE68A", accent: "#B45309",
    description: "Python for interviews & backend",
    modules: [
      { id: 1, title: "Python Data Types & Collections", link: "https://docs.python.org/3/library/stdtypes.html", done: false },
      { id: 2, title: "List/Dict/Set Comprehensions", link: "https://docs.python.org/3/tutorial/datastructures.html", done: false },
      { id: 3, title: "Functions – *args, **kwargs, Decorators", link: "https://realpython.com/primer-on-python-decorators/", done: false },
      { id: 4, title: "OOP in Python – Classes & Dunder Methods", link: "https://realpython.com/python3-object-oriented-programming/", done: false },
      { id: 5, title: "Generators & Iterators", link: "https://realpython.com/introduction-to-python-generators/", done: false },
      { id: 6, title: "File I/O & Context Managers", link: "https://realpython.com/working-with-files-in-python/", done: false },
      { id: 7, title: "Exception Handling & Custom Errors", link: "https://docs.python.org/3/tutorial/errors.html", done: false },
      { id: 8, title: "Multithreading vs Multiprocessing", link: "https://realpython.com/python-concurrency/", done: false },
      { id: 9, title: "Django / FastAPI Basics", link: "https://fastapi.tiangolo.com/", done: false },
      { id: 10, title: "Python for Data – Pandas & NumPy Basics", link: "https://pandas.pydata.org/docs/getting_started/index.html", done: false },
    ],
  },
  {
    id: "java_course", name: "Java", icon: "⬢", color: "#FBB6CE", accent: "#BE185D",
    description: "Java essentials for product companies",
    modules: [
      { id: 1, title: "Java OOP – Classes, Interfaces, Abstract", link: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/", done: false },
      { id: 2, title: "Collections Framework – List, Map, Set", link: "https://www.geeksforgeeks.org/collections-in-java-2/", done: false },
      { id: 3, title: "Generics & Type Safety", link: "https://www.geeksforgeeks.org/generics-in-java/", done: false },
      { id: 4, title: "Exception Handling – Checked vs Unchecked", link: "https://www.geeksforgeeks.org/exceptions-in-java/", done: false },
      { id: 5, title: "Java 8 – Streams, Lambda, Optional", link: "https://www.geeksforgeeks.org/stream-in-java/", done: false },
      { id: 6, title: "Multithreading – synchronized, volatile", link: "https://www.geeksforgeeks.org/multithreading-in-java/", done: false },
      { id: 7, title: "JVM Internals – Memory Model, GC", link: "https://www.geeksforgeeks.org/jvm-works-jvm-architecture/", done: false },
      { id: 8, title: "Spring Boot Fundamentals", link: "https://spring.io/guides/gs/spring-boot", done: false },
      { id: 9, title: "Design Patterns in Java", link: "https://refactoring.guru/design-patterns/java", done: false },
      { id: 10, title: "Java Interview Q&A – Top 50", link: "https://www.geeksforgeeks.org/java-interview-questions/", done: false },
    ],
  },
  {
    id: "sql_course", name: "SQL & Databases", icon: "⬟", color: "#C4B5FD", accent: "#6D28D9",
    description: "Database queries asked in interviews",
    modules: [
      { id: 1, title: "SELECT, WHERE, ORDER BY, GROUP BY", link: "https://sqlzoo.net/wiki/SQL_Tutorial", done: false },
      { id: 2, title: "JOINS – Inner, Left, Right, Full", link: "https://mode.com/sql-tutorial/sql-joins/", done: false },
      { id: 3, title: "Subqueries & CTEs (WITH clause)", link: "https://mode.com/sql-tutorial/sql-subqueries/", done: false },
      { id: 4, title: "Window Functions – ROW_NUMBER, RANK, LAG", link: "https://mode.com/sql-tutorial/sql-window-functions/", done: false },
      { id: 5, title: "Indexes – When & How to Use", link: "https://www.geeksforgeeks.org/indexing-in-databases-set-1/", done: false },
      { id: 6, title: "Stored Procedures & Functions", link: "https://www.geeksforgeeks.org/stored-procedures/", done: false },
      { id: 7, title: "Transactions – COMMIT, ROLLBACK, SAVEPOINT", link: "https://www.geeksforgeeks.org/sql-transactions/", done: false },
      { id: 8, title: "Query Optimization & EXPLAIN", link: "https://use-the-index-luke.com/", done: false },
      { id: 9, title: "NoSQL – MongoDB Queries & Aggregation", link: "https://www.mongodb.com/docs/manual/tutorial/query-documents/", done: false },
      { id: 10, title: "Top 30 SQL Interview Questions", link: "https://www.geeksforgeeks.org/sql-interview-questions/", done: false },
    ],
  },
  {
    id: "git_devops", name: "Git & DevOps", icon: "⎇", color: "#FCA5A5", accent: "#DC2626",
    description: "Modern dev workflow essentials",
    modules: [
      { id: 1, title: "Git Basics – init, add, commit, push", link: "https://git-scm.com/book/en/v2/Getting-Started-Git-Basics", done: false },
      { id: 2, title: "Branching & Merging Strategies", link: "https://www.atlassian.com/git/tutorials/using-branches", done: false },
      { id: 3, title: "Git Rebase vs Merge", link: "https://www.atlassian.com/git/tutorials/merging-vs-rebasing", done: false },
      { id: 4, title: "CI/CD Pipelines – GitHub Actions", link: "https://docs.github.com/en/actions", done: false },
      { id: 5, title: "Docker – Containers & Dockerfile", link: "https://docs.docker.com/get-started/", done: false },
      { id: 6, title: "Docker Compose – Multi-container Apps", link: "https://docs.docker.com/compose/", done: false },
      { id: 7, title: "Kubernetes Basics – Pods, Services, Deployments", link: "https://kubernetes.io/docs/tutorials/kubernetes-basics/", done: false },
      { id: 8, title: "AWS Essentials – EC2, S3, Lambda, RDS", link: "https://aws.amazon.com/getting-started/", done: false },
    ],
  },
];

// ─── COMPANIES DATA ──────────────────────────────────────────────────────────
export const COMPANIES = [
  {
    id: "google", name: "Google", color: "#4285F4", logo: "G",
    process: "1 Phone Screen → 4-5 Onsite Rounds (Coding + System Design + Behavioral)",
    difficulty: "Very Hard", avgPackage: "$180K–$350K",
    focusAreas: ["Hard DSA", "System Design", "Googleyness Culture Fit"],
    tips: [
      "Focus heavily on Hard LeetCode problems",
      "Practice system design for 1 hour sessions",
      "Read 'Cracking the Coding Interview'",
      "Know time & space complexity for every solution",
      "Practice thinking out loud constantly",
    ],
    questions: [
      { id: 1, title: "Word Ladder II", link: "https://leetcode.com/problems/word-ladder-ii/", difficulty: "Hard", freq: "High" },
      { id: 2, title: "Maximum Sliding Window", link: "https://leetcode.com/problems/sliding-window-maximum/", difficulty: "Hard", freq: "High" },
      { id: 3, title: "Serialize and Deserialize Binary Tree", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard", freq: "High" },
      { id: 4, title: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", freq: "Very High" },
      { id: 5, title: "LRU Cache", link: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium", freq: "High" },
      { id: 6, title: "Design a Search Autocomplete System", link: "https://leetcode.com/problems/design-search-autocomplete-system/", difficulty: "Hard", freq: "Medium" },
      { id: 7, title: "Minimum Window Substring", link: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", freq: "High" },
      { id: 8, title: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium", freq: "High" },
    ],
  },
  {
    id: "amazon", name: "Amazon", color: "#FF9900", logo: "A",
    process: "1 OA → 1 Phone Screen → 4-5 Loop Interviews (Coding + Leadership Principles)",
    difficulty: "Hard", avgPackage: "$150K–$280K",
    focusAreas: ["Leadership Principles", "Medium DSA", "System Design", "Behavioral STAR"],
    tips: [
      "Master all 16 Amazon Leadership Principles",
      "Prepare 3+ STAR stories per principle",
      "Focus on Medium LeetCode problems",
      "Practice array, trees, and DP heavily",
      "Always justify your decisions explicitly",
    ],
    questions: [
      { id: 1, title: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", freq: "Very High" },
      { id: 2, title: "LRU Cache", link: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium", freq: "High" },
      { id: 3, title: "Merge K Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", freq: "High" },
      { id: 4, title: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", freq: "High" },
      { id: 5, title: "Course Schedule", link: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium", freq: "Medium" },
      { id: 6, title: "Word Break", link: "https://leetcode.com/problems/word-break/", difficulty: "Medium", freq: "High" },
      { id: 7, title: "Clone Graph", link: "https://leetcode.com/problems/clone-graph/", difficulty: "Medium", freq: "Medium" },
    ],
  },
  {
    id: "microsoft", name: "Microsoft", color: "#00BCF2", logo: "M",
    process: "1 Phone Screen → 4-5 Onsite Rounds (Coding + Behavioral + Design)",
    difficulty: "Hard", avgPackage: "$140K–$260K",
    focusAreas: ["Medium-Hard DSA", "OOP Design", "Behavioral"],
    tips: [
      "Focus on Trees, Graphs, and DP",
      "Practice OOP design questions",
      "Prepare Growth Mindset stories",
      "Review Microsoft's culture and values",
      "LeetCode Medium is the sweet spot",
    ],
    questions: [
      { id: 1, title: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", freq: "Very High" },
      { id: 2, title: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", freq: "High" },
      { id: 3, title: "Binary Tree Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium", freq: "High" },
      { id: 4, title: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", freq: "High" },
      { id: 5, title: "Spiral Matrix", link: "https://leetcode.com/problems/spiral-matrix/", difficulty: "Medium", freq: "Medium" },
      { id: 6, title: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard", freq: "Medium" },
    ],
  },
  {
    id: "meta", name: "Meta", color: "#0668E1", logo: "M",
    process: "1 Initial Call → 2 Technical Screens → 3-4 Virtual Onsites",
    difficulty: "Very Hard", avgPackage: "$180K–$380K",
    focusAreas: ["Hard DSA", "System Design at Scale", "Product Sense"],
    tips: [
      "Focus on Hard LeetCode, especially graphs",
      "System design must handle billions of users",
      "Show product intuition in answers",
      "Practice under strict time constraints",
      "Study Meta's tech blog for real examples",
    ],
    questions: [
      { id: 1, title: "Accounts Merge", link: "https://leetcode.com/problems/accounts-merge/", difficulty: "Medium", freq: "High" },
      { id: 2, title: "Remove Invalid Parentheses", link: "https://leetcode.com/problems/remove-invalid-parentheses/", difficulty: "Hard", freq: "High" },
      { id: 3, title: "Subarray Sum Equals K", link: "https://leetcode.com/problems/subarray-sum-equals-k/", difficulty: "Medium", freq: "Very High" },
      { id: 4, title: "Kth Largest in Stream", link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", difficulty: "Easy", freq: "High" },
      { id: 5, title: "Basic Calculator II", link: "https://leetcode.com/problems/basic-calculator-ii/", difficulty: "Medium", freq: "Medium" },
      { id: 6, title: "Dot Product of Two Sparse Vectors", link: "https://leetcode.com/problems/dot-product-of-two-sparse-vectors/", difficulty: "Medium", freq: "High" },
    ],
  },
  {
    id: "netflix", name: "Netflix", color: "#E50914", logo: "N",
    process: "1 HR Screen → 1-2 Technical Screens → 3 Onsites",
    difficulty: "Very Hard", avgPackage: "$300K–$700K",
    focusAreas: ["Architecture", "System Design", "Distributed Systems"],
    tips: [
      "Deep knowledge of distributed systems required",
      "Chaos engineering and resilience patterns",
      "Strong on system design and architecture",
      "Culture deck is taken very seriously",
      "Expect deep dives on past projects",
    ],
    questions: [
      { id: 1, title: "Design Netflix Recommendation System", link: "https://netflixtechblog.com/", difficulty: "Hard", freq: "High" },
      { id: 2, title: "Consistent Hashing Implementation", link: "https://www.toptal.com/big-data/consistent-hashing", difficulty: "Hard", freq: "High" },
      { id: 3, title: "LRU Cache with TTL", link: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium", freq: "High" },
      { id: 4, title: "Rate Limiter Design", link: "https://systemdesign.one/rate-limiter-system-design/", difficulty: "Hard", freq: "Medium" },
    ],
  },
];

// ─── BEHAVIORAL QUESTIONS ────────────────────────────────────────────────────
export const BEHAVIORAL_CATEGORIES = [
  {
    id: "leadership", name: "Leadership & Ownership", icon: "Crown",
    questions: [
      "Tell me about a time you led a team through a difficult project.",
      "Describe a situation where you took ownership beyond your role.",
      "Give an example of when you had to make a decision with incomplete information.",
      "Tell me about a time you mentored someone.",
      "Describe a time you had to influence without authority.",
    ],
  },
  {
    id: "conflict", name: "Conflict & Challenges", icon: "Shield",
    questions: [
      "Tell me about a time you disagreed with your manager.",
      "Describe a situation where you had to work with a difficult teammate.",
      "Give an example of a major failure and what you learned.",
      "Tell me about a time you had to deliver bad news.",
      "Describe a time you had to push back on a requirement.",
    ],
  },
  {
    id: "achievement", name: "Achievements & Impact", icon: "Trophy",
    questions: [
      "What is your greatest technical achievement?",
      "Tell me about a project where you had the most impact.",
      "Describe a time you improved a process significantly.",
      "Give an example of a time you exceeded expectations.",
      "Tell me about the most challenging technical problem you solved.",
    ],
  },
  {
    id: "growth", name: "Growth & Learning", icon: "TrendUp",
    questions: [
      "Tell me about a time you had to learn something quickly.",
      "Describe a situation where you received critical feedback.",
      "Give an example of adapting to a big change.",
      "Tell me about a time you were outside your comfort zone.",
      "How do you stay updated with technology trends?",
    ],
  },
  {
    id: "amazon_lp", name: "Amazon Leadership Principles", icon: "Target",
    questions: [
      "Customer Obsession: Tell me about a time you went above and beyond for a customer.",
      "Ownership: Describe when you took ownership of a problem outside your scope.",
      "Invent & Simplify: When did you find a simpler solution to a complex problem?",
      "Are Right, A Lot: Tell me about a time your judgment proved correct.",
      "Learn & Be Curious: How do you keep up with new technologies?",
      "Hire & Develop the Best: Describe how you've helped someone on your team grow.",
      "Insist on Highest Standards: Tell me about refusing to compromise on quality.",
      "Think Big: Give an example of a long-term vision you drove.",
      "Bias for Action: Describe a time you acted decisively under uncertainty.",
      "Frugality: Give an example of accomplishing more with less.",
      "Earn Trust: How have you built trust with stakeholders?",
      "Dive Deep: When did you investigate a problem to its root cause?",
      "Have Backbone: Tell me about disagreeing and committing.",
      "Deliver Results: Describe delivering a key result despite obstacles.",
    ],
  },
];

export const RESOURCES = [
  { id: 1,  name: "NeetCode",             desc: "Best structured DSA roadmap with video explanations",         link: "https://neetcode.io/",                                                                                    category: "DSA",             icon: "Target"       },
  { id: 2,  name: "Striver's SDE Sheet",  desc: "180 must-do questions for product companies",                 link: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/",                  category: "DSA",             icon: "Clipboard"    },
  { id: 3,  name: "System Design Primer", desc: "Comprehensive GitHub repo for system design",                 link: "https://github.com/donnemartin/system-design-primer",                                                   category: "System Design",   icon: "SystemDesign" },
  { id: 4,  name: "Grokking Sys Design",  desc: "Educative course on large-scale system design",               link: "https://www.educative.io/courses/grokking-the-system-design-interview",                                  category: "System Design",   icon: "Book"         },
  { id: 5,  name: "Abdul Bari Algorithms",desc: "Best YouTube course for understanding algorithms",             link: "https://www.youtube.com/c/AbdulBari",                                                                   category: "DSA",             icon: "Play"         },
  { id: 6,  name: "CS50 by Harvard",      desc: "Free world-class intro to computer science",                  link: "https://cs50.harvard.edu/x/",                                                                           category: "CS Fundamentals", icon: "Globe"        },
  { id: 7,  name: "CTCI Book",            desc: "Cracking the Coding Interview — the bible",                   link: "https://www.crackingthecodinginterview.com/",                                                           category: "DSA",             icon: "Book"         },
  { id: 8,  name: "LeetCode",             desc: "Practice platform with 3000+ problems",                       link: "https://leetcode.com",                                                                                  category: "DSA",             icon: "Code"         },
  { id: 9,  name: "GeeksforGeeks",        desc: "Theory + problems for every CS topic",                        link: "https://geeksforgeeks.org",                                                                             category: "CS Fundamentals", icon: "Computer"     },
  { id: 10, name: "Blind 75",             desc: "75 most important LeetCode questions",                        link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions",                    category: "DSA",             icon: "Trophy"       },
  { id: 11, name: "ByteByByte",           desc: "System design interviews explained simply",                   link: "https://www.bytebybyte.com/",                                                                           category: "System Design",   icon: "Lightbulb"    },
  { id: 12, name: "Pramp",                desc: "Free peer-to-peer mock interview practice",                   link: "https://www.pramp.com/",                                                                                category: "Mock Interview",  icon: "Mic"          },
];