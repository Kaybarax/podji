import { useState } from 'react';
import './App.css';
import { TestButtonComponent } from './lib';

function App() {
  const [selectedComponent, setSelectedComponent] = useState<string>('TestButtonComponent');

  // List of available components
  const components = [{ id: 'TestButtonComponent', name: 'Test Button Component' }];

  // Render the selected component with all its variants
  const renderComponentVariants = () => {
    switch (selectedComponent) {
      case 'TestButtonComponent':
        return (
          <div className="component-variants">
            <h2>Button Variants</h2>

            <div className="variant-section">
              <h3>Primary</h3>
              <div className="variant-row">
                <div className="variant-item">
                  <h4>Small</h4>
                  <TestButtonComponent size="small" variant="primary">
                    Button
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Medium</h4>
                  <TestButtonComponent size="medium" variant="primary">
                    Button
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Large</h4>
                  <TestButtonComponent size="large" variant="primary">
                    Button
                  </TestButtonComponent>
                </div>
              </div>
            </div>

            <div className="variant-section">
              <h3>Secondary</h3>
              <div className="variant-row">
                <div className="variant-item">
                  <h4>Small</h4>
                  <TestButtonComponent size="small" variant="secondary">
                    Button
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Medium</h4>
                  <TestButtonComponent size="medium" variant="secondary">
                    Button
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Large</h4>
                  <TestButtonComponent size="large" variant="secondary">
                    Button
                  </TestButtonComponent>
                </div>
              </div>
            </div>

            <div className="variant-section">
              <h3>Tertiary</h3>
              <div className="variant-row">
                <div className="variant-item">
                  <h4>Small</h4>
                  <TestButtonComponent size="small" variant="tertiary">
                    Button
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Medium</h4>
                  <TestButtonComponent size="medium" variant="tertiary">
                    Button
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Large</h4>
                  <TestButtonComponent size="large" variant="tertiary">
                    Button
                  </TestButtonComponent>
                </div>
              </div>
            </div>

            <div className="variant-section">
              <h3>Disabled</h3>
              <div className="variant-row">
                <div className="variant-item">
                  <h4>Primary</h4>
                  <TestButtonComponent variant="primary" disabled>
                    Disabled
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Secondary</h4>
                  <TestButtonComponent variant="secondary" disabled>
                    Disabled
                  </TestButtonComponent>
                </div>
                <div className="variant-item">
                  <h4>Tertiary</h4>
                  <TestButtonComponent variant="tertiary" disabled>
                    Disabled
                  </TestButtonComponent>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a component from the sidebar</div>;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Components</h2>
        <ul>
          {components.map(component => (
            <li
              key={component.id}
              className={selectedComponent === component.id ? 'selected' : ''}
              onClick={() => setSelectedComponent(component.id)}
            >
              {component.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>{selectedComponent}</h1>
        {renderComponentVariants()}
      </div>
    </div>
  );
}

export default App;
