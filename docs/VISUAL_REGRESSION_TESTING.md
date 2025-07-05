# Mobile UI Visual Regression Testing

This document explains how to use BackstopJS for visual regression testing of mobile UI components in the Podji monorepo.

## Overview

The visual regression testing setup automatically tests all mobile UI components that are defined in Storybook stories. It captures screenshots of each component in different states and compares them against reference images to detect visual changes.

## Setup

The visual regression testing system is already configured with the following components:

- **BackstopJS Configuration**: `backstop.mobile.config.js` - Main configuration file
- **Engine Scripts**: Located in `backstop_data/engine_scripts/puppet/` - Custom scripts for handling page interactions
- **Automation Scripts**: Located in `scripts/` - Helper scripts for generating scenarios and running tests

## Usage

### Running Visual Regression Tests

There are several ways to run the visual regression tests:

#### 1. Automated Full Test (Recommended)

```bash
# This will automatically start Storybook, generate scenarios, and run tests
yarn backstop:test:mobile:auto
```

This command will:

1. Start the Storybook server
2. Wait for it to be ready
3. Generate BackstopJS scenarios based on available stories
4. Run visual regression tests
5. Clean up and stop the Storybook server

#### 2. Manual Step-by-Step Testing

If you prefer more control or need to debug:

```bash
# 1. Start Storybook server (in a separate terminal)
yarn storybook:mobile

# 2. Generate/update scenarios based on current stories
yarn backstop:generate-scenarios

# 3. Create reference images (first time or when accepting changes)
yarn backstop:reference:mobile

# 4. Run the visual regression tests
yarn backstop:test:mobile
```

### Creating Reference Images

Before running tests for the first time, or when you want to accept visual changes as the new baseline:

```bash
yarn backstop:reference:mobile
```

This will create reference screenshots that future tests will be compared against.

## Component Coverage

The system automatically tests all components that have Storybook stories in the `development/mobile-ui-dev/stories/` directory:

- Badge (Default, Primary, Secondary)
- Button (Primary, Secondary, Large, Small)
- Checkbox (Default, Checked)
- DatePicker
- Dropdown
- FeedCard
- FloatingActionButton
- Header
- Link
- Modal
- NavigationBar
- BottomTabNavigator
- Page
- Pagination
- RadioButton (Default, Selected)
- Slider
- TextInput (Default, With Error)
- Toast (Success, Error)
- Toggle (Default, Enabled)

## Configuration

### Viewports

Tests are run on the following viewport sizes:

- **Phone**: 375x667 (iPhone SE)
- **Tablet**: 768x1024 (iPad)

### Test Settings

- **Mismatch Threshold**: 0.1% (configurable per scenario)
- **Delay**: 1000ms (1500ms for animated components like modals)
- **Engine**: Puppeteer with Chrome
- **Selectors**: Tests the entire Storybook root container

### File Structure

```
backstop_data/
├── bitmaps_reference/     # Reference images (baseline)
├── bitmaps_test/          # Test images (current)
├── html_report/           # Visual diff reports
├── ci_report/             # CI-friendly reports
└── engine_scripts/        # Custom Puppeteer scripts
    └── puppet/
        ├── onBefore.js    # Pre-test setup
        ├── onReady.js     # Post-load actions
        └── loadCookies.js # Cookie management
```

## Adding New Components

When you add new Storybook stories:

1. Create your story file in `development/mobile-ui-dev/stories/`
2. Run `yarn backstop:generate-scenarios` to update the test scenarios
3. Run `yarn backstop:reference:mobile` to create reference images
4. The component will now be included in future visual regression tests

## Handling Test Failures

When tests fail, BackstopJS generates an HTML report showing visual differences:

1. Open `development/mobile-ui-dev/backstop_data/html_report/index.html`
2. Review the differences between reference and test images
3. If changes are intentional:
   - Run `yarn backstop:reference:mobile` to update references
4. If changes are bugs:
   - Fix the component and re-run tests

## Troubleshooting

### Common Issues

1. **Storybook not starting**: Ensure all dependencies are installed with `yarn install`
2. **Tests timing out**: Increase delay values in the backstop config for slow components
3. **Flaky tests**: Components with animations may need longer delays or animation disabling
4. **Missing scenarios**: Run `yarn backstop:generate-scenarios` to regenerate based on current stories

### Debug Mode

To debug test failures:

1. Set `debug: true` in `backstop.mobile.config.js`
2. Set `debugWindow: true` to see the browser during tests
3. Check console output for detailed error messages

## CI/CD Integration

For continuous integration, use:

```bash
# In CI pipelines
yarn backstop:test:mobile:auto
```

The automated script handles all setup and cleanup, making it suitable for CI environments.

## Best Practices

1. **Component Isolation**: Ensure components render consistently without external dependencies
2. **Animation Control**: Disable animations in test environments for consistent screenshots
3. **Data Consistency**: Use fixed/mock data in stories to prevent content-based test failures
4. **Regular Updates**: Update reference images when intentional visual changes are made
5. **Granular Testing**: Create separate stories for different component states/variants

## Performance

- Tests run with `asyncCaptureLimit: 5` and `asyncCompareLimit: 50` for optimal performance
- Average test time: ~30 seconds for all components (depending on system performance)
- Reference image generation: ~20 seconds for all components
