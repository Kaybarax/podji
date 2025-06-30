# Mobile App UI Components and Controls Overview

## **Core Components**

### **Profile Screen**

- Safe Area Container

  - Ensures content respects device notches and system bars

- Scrollable Main Content

  - Full-screen scroll view with bounce effect

  - Native momentum scrolling

### **Photo Components**

- Main Profile Photo

  - Full-width hero image

  - Aspect ratio optimized for portrait

  - Online status indicator overlay

- Photo Gallery

  - Horizontal scrollable container

  - Fixed-size photo cards

  - Smooth native scrolling

  - Image loading optimization

### **Profile Information**

- Header Section

  - User name and age

  - Large, bold typography

- Action Buttons

  - Primary Message button

    - Background of appropriate color determined from the color palette

    - Icon \+ text layout

  - Secondary Wink button

    - Pink accent

    - Icon \+ text layout

### **Details Section**

- Card Container

  - Background of appropriate color determined from the color palette

  - Rounded corners

  - Subtle shadow

- Information Grid

  - Label/value pairs

  - Responsive layout

  - Clear typography hierarchy

### **Interests Section**

- Card Container

  - Matching style to details

- Tags Layout

  - Horizontal flow

  - Pill-shaped tags

  - Accent colors appropriately determined from the color palette

  - Dynamic wrapping

## **Visual Design**

### **Typography**

- System fonts for optimal performance

- Size hierarchy:

  - Name: 24pt bold

  - Section titles: 18pt semibold

  - Body text: 16pt regular

  - Tags: 12pt medium

### **Layout**

- Safe area respecting

- 16px base padding

- 12px border radius

- Consistent spacing:

  - Vertical rhythm: 16px/20px

  - Horizontal gaps: 8px/12px

  - Section margins: 16px/20px

### **Interactive Elements**

- Buttons

  - Icon \+ text alignment

  - Active state feedback

- Scrollable Areas

  - Native momentum

  - Hide scroll indicators

  - Smooth deceleration

## **Responsive Behavior**

- Dynamic width calculations

- Flexible photo grid

- Adaptive text sizing

- Safe area insets

- Keyboard avoidance

## **Performance Considerations**

- Image lazy loading

- Memory efficient scrolling

- Native animations

- Optimized re-renders

- Cached user data
