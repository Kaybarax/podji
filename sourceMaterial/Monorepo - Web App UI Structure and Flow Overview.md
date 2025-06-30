# Web App UI Structure and Flow Overview

## **Page Layout & Navigation Flow**

### **Initial Page Load**

1. User arrives at profile page

   - Top navigation bar appears fixed at viewport top

   - Sub-navigation bar appears fixed below top bar

   - Main content area loads with profile information

   - Footer anchors to bottom

### **Navigation Structure**

#### **Top Navigation Bar (Fixed Position)**

- Location: Viewport top, always visible

- Components left to right:

  1. Logo area (left-aligned)

     - Heart icon \+ "Monorepo" text

     - Click: Returns to home/main feed

  2. Main navigation (right-aligned on desktop, hidden on mobile)

     - Discover (Search icon)

     - Messages (MessageCircle icon)

     - Notifications (Bell icon)

     - Profile (User icon)

     - Each item: Hover shows slight color change

  3. Mobile menu button (visible only on mobile)

     - Click: Toggles mobile navigation dropdown

     - Transforms from menu to X icon when active

#### **Sub Navigation Bar (Fixed Position)**

- Location: Below top bar, always visible

- Components left to right:

  - Profiles (active state)

  - Messages

  - Matches

  - Liked You

  - Favorites

- Behavior:

  - Horizontally scrollable on mobile

  - Active item shows underline with an appropriate color determined from the color palette

  - Hover: Text darkens with an appropriate color determined from the color palette

### **Main Content Flow**

#### **Profile Header Section**

- Location: Top of main content area (pt-28 to account for fixed bars)

- Layout:

  1. Left Column (md:w-1/2 lg:w-2/5):

     - User's name (text-3xl)

     - Main profile photo

       - Aspect ratio: 4:5

       - Hover: Slight scale animation

       - Online indicator: Top-right corner

  2. Right Column (md:w-1/2 lg:w-3/5):

     - Message button (full width)

       - Click: Opens message composer

     - Two-column layout below:

       - Left side:

         - Details grid (age, height, etc.)

       - Right side:

         - Wink button

         - Interests section

#### **Photo Gallery Section**

- Location: Below profile header

- Layout:

  - Horizontal scroll container

  - Navigation arrows on sides

  - Scroll indicator below

- Interaction:

  - Left/right arrows scroll content

  - Photos scale slightly on hover

  - Smooth scroll animation

  - Progress bar shows scroll position

#### **Stories Section**

- Location: Below photo gallery

- Layout:

  - Grid system (1-3 columns based on viewport)

  - Equal height cards

- Components per story:

  - Photo/video container (top)

  - Title

  - Content preview

- Interaction:

  - Cards elevate on hover

  - Media expands on click

#### **Suggested Profiles Section**

- Location: Above footer

- Layout:

  - Horizontal scroll container

  - Fixed-width cards (w-60)

- Per profile card:

  - Main photo

  - Name and basic info overlay

  - Like button

- Interaction:

  - Cards slide up slightly on hover

  - Click navigates to that profile

  - Like button shows animation

### **Footer Structure**

- Location: Bottom of page

- Layout: Multi-column grid

  - Brand column (largest)

    - Logo

    - Description

    - Social links

  - Company links

  - Support links

  - Legal links

  - Contact information

- Responsive behavior:

  - Columns stack on mobile

  - Social icons maintain spacing

  - Links show hover state

## **Responsive Behavior Flow**

### **Desktop to Tablet Transition (\< 1024px)**

1. Main content max-width reduces

2. Profile header columns adjust width

3. Grid columns reduce in stories section

### **Tablet to Mobile Transition (\< 768px)**

1. Top navigation consolidates to mobile menu

2. Profile header stacks vertically

3. Two-column layouts become single column

4. Footer columns stack

5. Horizontal scrolling sections adjust padding

### **Mobile-Specific Interactions**

1. Menu button reveals dropdown

2. Sub-navigation becomes scrollable

3. Gallery navigation optimizes for touch

4. Card interactions adjust for touch events

## **State Management Flow**

### **Online Status**

- Green dot indicator

- Pulse animation when active

- Updates in real-time

### **Navigation States**

- Active page highlighted

- Hover states provide feedback

- Mobile menu state preserved

### **Interactive Elements**

1. Buttons

   - Default state

   - Hover state (color shift)

   - Active state (slight scale)

   - Disabled state (reduced opacity)

2. Links

   - Default (an appropriate color determined from the color palette)

   - Hover (an appropriate color determined from the color palette)

   - Visited (handled by browser)

3. Cards

   - Rest state (shadow-md)

   - Hover state (shadow-lg \+ transform)

   - Active state (slight scale down)

## **Animation Flow**

### **Micro-interactions**

1. Button hovers

   - Duration: 200ms

   - Easing: ease-out

   - Color transition

   - Optional scale

2. Card hovers

   - Duration: 300ms

   - Easing: ease-out

   - Shadow transition

   - Y-axis transform

3. Navigation hovers

   - Duration: 200ms

   - Color transition

   - Optional underline

### **Page-level Animations**

1. Mobile menu

   - Slide down \+ fade

   - Duration: 300ms

   - Easing: ease-in-out

2. Content loading

   - Fade in \+ slide up

   - Duration: 500ms

   - Staggered children

3. Gallery transitions

   - Smooth scroll

   - Duration: 300ms

   - Easing: ease-out

## **Error State Flow**

### **Network Issues**

1. Failed image loads

   - Fallback placeholder

   - Retry mechanism

   - Error message overlay

### **Interactive Failures**

1. Message/Wink button

   - Error feedback

   - Recovery options

   - User notification

### **Navigation Errors**

1. Invalid profile

   - Redirect to 404

   - Return to previous

   - Error boundary catch

## **Accessibility Flow**

### **Keyboard Navigation**

1. Tab order

   - Logical progression

   - Visible focus states

   - Skip links available

### **Screen Reader Support**

1. Image descriptions

2. Button labels

3. Semantic HTML

4. ARIA attributes

### **Color Contrast**

1. Text readability

2. Interactive elements

3. Status indicators

## **Performance Considerations**

### **Image Loading**

1. Lazy loading

   - Below-fold images

   - Gallery images

   - Story media

### **Interaction Handling**

1. Debounced scroll

2. Throttled resize

3. Optimized animations

### **State Updates**

1. Batched updates

2. Memoized components

3. Efficient re-renders
