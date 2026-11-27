// The list of exercises. main.jsx uses it to pick the demo for ?demo=…,
// and scripts/make-page.mjs uses it to write Week13-1/index.html.
export const sections = [
  {
    id: 'homework',
    title: 'Homework',
    intro: 'The Student Profile Editor and the multi-step registration code challenge from page 29 (12.5% + 12.5%).',
    items: [
      {
        id: 'H1', slug: 'profile-editor', file: 'homework/ProfileEditor.jsx',
        title: 'Student profile editor',
        goal: 'A full form for a student management system: name, student ID (10 digits), major (dropdown), year (1–4 radio), bio and a photo (file + preview). All fields are required, the ID must be exactly 10 digits and the bio under 200 characters, with a live bio counter. On submit, show a “Profile Preview” card. Stretch: skills as tags (Enter to add, × to remove).',
        result: 'One <code>handleChange</code> serves every text field through <code>[name]: value</code>. <code>validate()</code> returns an errors object, and an empty object means the form can be saved. Errors appear after a field loses focus (<code>onBlur</code>), and are linked with <code>aria-describedby</code>. The photo is read with <code>useRef</code> and shown with <code>URL.createObjectURL</code>; an effect cleanup frees the old preview URL. Skills are an array: Enter adds a tag, × removes it.',
      },
      {
        id: 'H2', slug: 'wizard', file: 'homework/MultiStepRegistration.jsx',
        title: 'Code challenge: multi-step registration',
        goal: 'A 3-step wizard. Step 1: name (min 2) and email. Step 2: username (min 3, no spaces), password (min 8) and confirm password. Step 3: role (Student | TA | Instructor radio), newsletter checkbox and a read-only review. Next is enabled only when the step is valid, the progress shows “Step 2 of 3”, Previous keeps the data, and Submit calls <code>console.log(fullFormObject)</code>.',
        result: 'All answers live in one object, so going back never loses anything. Errors are calculated from the form on every render instead of being stored, so <code>disabled={!valid}</code> on Next is always right. Submit logs the object and also shows it on the page, with the password hidden. It looks like the target result on the slide: a white card, a 3-part progress bar, field names inside the inputs, a red border when Confirm does not match, and a grey Next while the step is invalid.',
      },
    ],
  },
  {
    id: 'study',
    title: 'Study guide: exercises 1–3',
    intro: 'The three practice exercises at the end of the Week 13 Monday study guide (25%).',
    items: [
      {
        id: 'S1', slug: 'bio-counter', file: 'study/BioCounter.jsx',
        title: 'Exercise 1: live character counter',
        goal: 'A controlled <code>&lt;textarea&gt;</code> with a maximum of 200 characters and a live “X / 200” count below it.',
        result: 'The count is simply <code>bio.length</code>. <code>slice(0, 200)</code> stops new text at the limit. The guide says to disable the field there, but a disabled textarea cannot be edited, so you could never delete anything; the counter turns red near the limit instead.',
      },
      {
        id: 'S2', slug: 'contact-form', file: 'study/ContactForm.jsx',
        title: 'Exercise 2: contact form with validation',
        goal: 'Name, Email and Message fields, all validated on submit, with errors next to each field. After a successful submit, show a “Thank you” message and reset the form.',
        result: 'The three fields are rendered from one list and share one handler. Typing in a field clears its error. A valid submit shows the thank-you message and puts the form back to empty.',
      },
      {
        id: 'S3', slug: 'skill-picker', file: 'study/SkillPicker.jsx',
        title: 'Exercise 3: skills checklist with counter',
        goal: 'Six programming skills as checkboxes, a live counter of the selected ones, and the warning “Please select at most 3 skills.” when more than 3 are checked.',
        result: 'The checked skills are one array. Each checkbox uses <code>checked={selected.includes(skill)}</code> and reads <code>e.target.checked</code>.',
      },
    ],
  },
  {
    id: 'video',
    title: 'Video lecture: page 13 challenge',
    intro: 'The practice challenge on page 13 of the Week 13 Monday video lecture (25%).',
    items: [
      {
        id: 'V1', slug: 'feedback-form', file: 'video/FeedbackForm.jsx',
        title: 'Course feedback form',
        goal: 'Student name (required), student ID (8 digits), a rating with radio buttons (⭐⭐⭐⭐⭐ / ⭐⭐⭐⭐ / ⭐⭐⭐), “topics covered well” checkboxes (HTML, CSS, JavaScript, Git, React), and comments (max 300) with a live count. On submit, validate and say “Thank you!” with the name. Bonus: disable Submit while a required field is empty.',
        result: 'Text, radios and the textarea share one handler; the topics are an array. <code>missing</code> is worked out during render and disables the button, and the 8-digit check runs on submit.',
      },
    ],
  },
]

export const all = sections.flatMap((s) => s.items)
