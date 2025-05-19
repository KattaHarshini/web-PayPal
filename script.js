document.addEventListener('DOMContentLoaded', () => {
    const questionsListDiv = document.getElementById('questions-list');
    const hintModal = document.getElementById('hint-modal');
    const hintQuestionTitle = document.getElementById('hint-question');
    const hintContentDiv = document.getElementById('hint-content');
    const closeBtn = document.querySelector('.close-btn');

    // Complete list of Fasal coding questions with hints and answers
    const fasalQuestions = [
        // ... (your existing question array remains the same)
        {
    "question": " Find First Non-Repeating Character",
    "description": "Identify the first character in a string that does not repeat.",
    "hint": "Use a frequency map, then iterate again to find the first unique character.",
    "answer": `
<p><strong>Sample Answer (JavaScript):</strong></p>
<pre><code class="language-javascript">function firstNonRepeatingChar(s) {
  const count = {};
  for (let ch of s) {
    count[ch] = (count[ch] || 0) + 1;
  }
  for (let ch of s) {
    if (count[ch] === 1) return ch;
  }
  return null;
}
</code></pre>
`
  },
  {
    "question": " Merge Intervals",
    "description": "Given a list of intervals, merge all overlapping intervals.",
    "hint": "Sort intervals by start, then iterate and merge.",
    "answer": `
<pre><code class="language-javascript">function merge(intervals) {
  if (!intervals.length) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    let last = result[result.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      result.push(intervals[i]);
    }
  }
  return result;
}
</code></pre>
`
  },
  {
    "question": " Check if Two Strings are Anagrams",
    "description": "Return true if one string is an anagram of another.",
    "hint": "Sort or use a hashmap to compare character frequencies.",
    "answer": `
<pre><code class="language-javascript">function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const map = {};
  for (let ch of s) map[ch] = (map[ch] || 0) + 1;
  for (let ch of t) {
    if (!map[ch]) return false;
    map[ch]--;
  }
  return true;
}
</code></pre>
`
  },
  {
    "question": " Implement a Stack using Queues",
    "description": "Simulate stack behavior (LIFO) using two queues.",
    "hint": "Use two queues to simulate stack push and pop.",
    "answer": `
<pre><code class="language-javascript">class MyStack {
  constructor() {
    this.q1 = [], this.q2 = [];
  }

  push(x) {
    this.q2.push(x);
    while (this.q1.length) this.q2.push(this.q1.shift());
    [this.q1, this.q2] = [this.q2, this.q1];
  }

  pop() {
    return this.q1.shift();
  }

  top() {
    return this.q1[0];
  }

  empty() {
    return !this.q1.length;
  }
}
</code></pre>
`
  },
  {
    "question": " Longest Palindromic Substring",
    "description": "Find the longest palindromic substring in a given string.",
    "hint": "Expand around center for each character and track max length.",
    "answer": `
<pre><code class="language-javascript">function longestPalindrome(s) {
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    const len1 = expand(s, i, i);
    const len2 = expand(s, i, i + 1);
    const len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }
  return s.slice(start, end + 1);

  function expand(s, l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--; r++;
    }
    return r - l - 1;
  }
}
</code></pre>
`
  },
  {
    "question": " Find All Duplicates in an Array",
    "description": "Return all elements that appear twice in an array.",
    "hint": "Use a Set or mark indexes as visited.",
    "answer": `
<pre><code class="language-javascript">function findDuplicates(nums) {
  const result = [];
  const seen = new Set();
  for (let num of nums) {
    if (seen.has(num)) result.push(num);
    else seen.add(num);
  }
  return result;
}
</code></pre>
`
  },
  {
    "question": " Move Zeroes to End",
    "description": "Move all zeros in an array to the end while maintaining order of non-zero elements.",
    "hint": "Use a two-pointer approach.",
    "answer": `
<pre><code class="language-javascript">function moveZeroes(nums) {
  let insertPos = 0;
  for (let num of nums) {
    if (num !== 0) nums[insertPos++] = num;
  }
  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }
}
</code></pre>
`
  },
  {
    "question": " Detect Cycle in Linked List",
    "description": "Check if a linked list has a cycle using Floyd’s Tortoise and Hare.",
    "hint": "Use two pointers moving at different speeds.",
    "answer": `
<pre><code class="language-javascript">function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
</code></pre>
`
  },
  {
    "question": " Implement Queue Using Stacks",
    "description": "Design a queue using two stacks.",
    "hint": "Use two stacks: input and output.",
    "answer": `
<pre><code class="language-javascript">class MyQueue {
  constructor() {
    this.inStack = [], this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  pop() {
    this.peek();
    return this.outStack.pop();
  }

  peek() {
    if (!this.outStack.length) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return !this.inStack.length && !this.outStack.length;
  }
}
</code></pre>
`
  },
  {
    "question": " Binary Tree Level Order Traversal",
    "description": "Return the level-order traversal of a binary tree.",
    "hint": "Use a queue to perform BFS.",
    "answer": `
<pre><code class="language-javascript">function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    let level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
</code></pre>
`
  },
  {
    "question": " Subarray Sum Equals K",
    "description": "Find the total number of continuous subarrays whose sum equals to k.",
    "hint": "Use a hash map to store prefix sums.",
    "answer": `
<pre><code class="language-javascript">function subarraySum(nums, k) {
  const map = {0: 1};
  let sum = 0, count = 0;
  for (let num of nums) {
    sum += num;
    if (map[sum - k]) count += map[sum - k];
    map[sum] = (map[sum] || 0) + 1;
  }
  return count;
}
</code></pre>
`
  },
  {
    "question": " Maximum Subarray",
    "description": "Find the contiguous subarray with the largest sum.",
    "hint": "Use Kadane’s Algorithm.",
    "answer": `
<pre><code class="language-javascript">function maxSubArray(nums) {
  let maxSum = nums[0], currSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSum = Math.max(maxSum, currSum);
  }
  return maxSum;
}
</code></pre>
`
  },
  {
    "question": " Product of Array Except Self",
    "description": "Return an array where each element is the product of all other elements except itself.",
    "hint": "Use prefix and suffix product arrays.",
    "answer": `
<pre><code class="language-javascript">function productExceptSelf(nums) {
  const n = nums.length, res = Array(n).fill(1);
  let prefix = 1, suffix = 1;
  for (let i = 0; i < n; i++) {
    res[i] *= prefix;
    prefix *= nums[i];
  }
  for (let i = n - 1; i >= 0; i--) {
    res[i] *= suffix;
    suffix *= nums[i];
  }
  return res;
}
</code></pre>
`
  },
  {
    "question": " Rotate Array",
    "description": "Rotate an array to the right by k steps.",
    "hint": "Reverse parts of the array.",
    "answer": `
<pre><code class="language-javascript">function rotate(nums, k) {
  k %= nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);

  function reverse(arr, start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++; end--;
    }
  }
}
</code></pre>
`
  },
  {
    "question": " Climbing Stairs",
    "description": "You can climb 1 or 2 steps. How many distinct ways to climb to the top?",
    "hint": "Use dynamic programming, like Fibonacci.",
    "answer": `
<pre><code class="language-javascript">function climbStairs(n) {
  let a = 1, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = b;
    b = a + b;
    a = temp;
  }
  return b;
}
</code></pre>
`
  },
  {
    "question": " Valid Parentheses",
    "description": "Check if the input string of brackets is valid.",
    "hint": "Use a stack to match open and close brackets.",
    "answer": `
<pre><code class="language-javascript">function isValid(s) {
  const stack = [], map = {')': '(', '}': '{', ']': '['};
  for (let ch of s) {
    if ([')', '}', ']'].includes(ch)) {
      if (stack.pop() !== map[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}
</code></pre>
`
  },
  {
    "question": " Count Primes",
    "description": "Count the number of prime numbers less than a non-negative number, n.",
    "hint": "Use the Sieve of Eratosthenes.",
    "answer": `
<pre><code class="language-javascript">function countPrimes(n) {
  const isPrime = Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return isPrime.filter(p => p).length;
}
</code></pre>
`
  },
  {
    "question": " Find Peak Element",
    "description": "Find a peak element in the array.",
    "hint": "Use binary search.",
    "answer": `
<pre><code class="language-javascript">function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) right = mid;
    else left = mid + 1;
  }
  return left;
}
</code></pre>
`
  },
  {
    "question": " Two Sum II - Input Array is Sorted",
    "description": "Return indices of two numbers such that they add up to target.",
    "hint": "Use two pointers since array is sorted.",
    "answer": `
<pre><code class="language-javascript">function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    else if (sum < target) left++;
    else right--;
  }
}
</code></pre>
`
  },
  {
    "question": " House Robber",
    "description": "You can't rob adjacent houses. Maximize the amount you can rob.",
    "hint": "Use dynamic programming to track include and exclude cases.",
    "answer": `
<pre><code class="language-javascript">function rob(nums) {
  let rob1 = 0, rob2 = 0;
  for (let n of nums) {
    let temp = Math.max(n + rob1, rob2);
    rob1 = rob2;
    rob2 = temp;
  }
  return rob2;
}
</code></pre>
`
  },
  {
    "question": " Describe a time when you had to challenge the status quo.",
    "description": "Tests initiative, innovation, and ability to drive change.",
    "hint": "Share a situation where you introduced a better way of doing things.",
    "answer": "At my previous internship, I noticed the team was manually logging bugs, which was time-consuming. I suggested and implemented a script to auto-log issues into our bug tracker, reducing the time spent and increasing accuracy."
  },
  {
    "question": " How do you manage conflict in a team setting?",
    "description": "Assesses interpersonal skills and maturity in handling disagreements.",
    "hint": "Show empathy, communication, and problem-solving in your example.",
    "answer": "During a group project, two teammates disagreed on the design approach. I facilitated a discussion where each could share their points, and we ultimately merged the best ideas from both sides, satisfying everyone and improving the project."
  },
  {
    "question": " Tell me about a time you failed and how you handled it.",
    "description": "Evaluates resilience, accountability, and learning from mistakes.",
    "hint": "Be honest, explain what you learned, and how you improved.",
    "answer": "I once missed a key requirement during a coding task, causing a feature delay. I took responsibility, fixed it promptly, and implemented a personal checklist process that helped me avoid such oversights in future tasks."
  },
  {
    "question": " What motivates you to work at PayPal?",
    "description": "Checks alignment with company values and candidate’s motivation.",
    "hint": "Relate your goals with PayPal's mission to democratize financial services.",
    "answer": "I’m inspired by PayPal's mission to make financial services accessible globally. I want to contribute to meaningful products that empower users, especially in developing markets."
  },
  {
    "question": " How do you prioritize tasks when working on multiple projects?",
    "description": "Evaluates time management and organizational skills.",
    "hint": "Mention planning tools, communication, and balancing urgency vs importance.",
    "answer": "I use tools like Trello and the Eisenhower Matrix to organize tasks by urgency and importance. I also communicate regularly with stakeholders to ensure priorities align with deadlines and expectations."
  }


    ];

    fasalQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question-item');

        const title = document.createElement('h3');
        title.textContent = `${index + 1}. ${question.question}`;

        const description = document.createElement('p');
        description.textContent = question.description;

        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.marginTop = '15px';

        // Hint Button
        const hintButton = document.createElement('button');
        hintButton.textContent = 'Show Hint';
        hintButton.style.padding = '10px 20px';
        hintButton.style.border = 'none';
        hintButton.style.borderRadius = '5px';
        hintButton.style.backgroundColor = '#4CAF50';
        hintButton.style.color = 'white';
        hintButton.style.fontWeight = 'bold';
        hintButton.style.cursor = 'pointer';
        hintButton.style.transition = 'all 0.3s ease';
        hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for hint button
        hintButton.addEventListener('mouseover', () => {
            hintButton.style.backgroundColor = '#45a049';
            hintButton.style.transform = 'translateY(-2px)';
            hintButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('mouseout', () => {
            hintButton.style.backgroundColor = '#4CAF50';
            hintButton.style.transform = 'translateY(0)';
            hintButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        hintButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = `<p>${question.hint}</p>`;
            hintModal.style.display = 'block';
        });

        // Answer Button
        const answerButton = document.createElement('button');
        answerButton.textContent = 'Show Answer';
        answerButton.style.padding = '10px 20px';
        answerButton.style.border = 'none';
        answerButton.style.borderRadius = '5px';
        answerButton.style.backgroundColor = '#2196F3';
        answerButton.style.color = 'white';
        answerButton.style.fontWeight = 'bold';
        answerButton.style.cursor = 'pointer';
        answerButton.style.transition = 'all 0.3s ease';
        answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        
        // Hover effect for answer button
        answerButton.addEventListener('mouseover', () => {
            answerButton.style.backgroundColor = '#0b7dda';
            answerButton.style.transform = 'translateY(-2px)';
            answerButton.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('mouseout', () => {
            answerButton.style.backgroundColor = '#2196F3';
            answerButton.style.transform = 'translateY(0)';
            answerButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        });
        
        answerButton.addEventListener('click', () => {
            hintQuestionTitle.textContent = question.question;
            hintContentDiv.innerHTML = question.answer;
            hintModal.style.display = 'block';
        });

        // Add buttons to container
        buttonContainer.appendChild(hintButton);
        buttonContainer.appendChild(answerButton);

        questionDiv.appendChild(title);
        questionDiv.appendChild(description);
        questionDiv.appendChild(buttonContainer);
        questionsListDiv.appendChild(questionDiv);
    });

    closeBtn.addEventListener('click', () => {
        hintModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === hintModal) {
            hintModal.style.display = 'none';
        }
    });
});