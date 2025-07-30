### Summary Usage of the Refactored `DataNavigation` Component:

The `DataNavigation` component provides a simple interface for navigating through a list or collection of data items. It features **previous** and **next** buttons, as well as a descriptive label in between to display the current data context or item. This is especially useful in scenarios where you need to paginate through data or switch between individual data entries.

### Key Features:

1. **Previous/Next Navigation**:
   - The component allows users to navigate back and forth between data items using two buttons.
   - The `previousCondition` and `nextCondition` props control whether the buttons are enabled or disabled, preventing invalid navigation (e.g., when on the first or last item).

2. **Data Context Display**:
   - A label in the center provides a description of the current data item being viewed, keeping users informed of what they are looking at.

3. **Customizable Text**:
   - You can easily customize the labels of the previous and next buttons using `previousText` and `nextText`.

4. **Accessibility**:
   - Each button has a corresponding `id` and `data-testid` for easy identification in testing and interaction.

### Props Overview:

- `dataId`: (number) The ID of the currently focused data item.
- `setDataFocus`: (function) A callback function that updates the `dataId` to focus on the previous or next data item.
- `previousText`: (string, optional) Label text for the "Previous" button. Default is `"Previous"`.
- `previousCondition`: (boolean) Condition to disable the "Previous" button.
- `nextText`: (string, optional) Label text for the "Next" button. Default is `"Next"`.
- `nextCondition`: (boolean) Condition to disable the "Next" button.
- `dataDescription`: (string, optional) Text description of the current data item, displayed between the buttons.

### Example Usage:

```tsx
import React, { useState } from "react";
import DataNavigation from "./DataNavigation";

const MyDataComponent = () => {
  const [currentDataId, setCurrentDataId] = useState(1);

  const dataItems = ["Item 1", "Item 2", "Item 3"]; // Sample data

  return (
    <div>
      <h2>Data Viewer</h2>
      <DataNavigation
        dataId={currentDataId}
        setDataFocus={setCurrentDataId}
        previousText="Back"
        nextText="Forward"
        previousCondition={currentDataId === 0} // Disable if it's the first item
        nextCondition={currentDataId === dataItems.length - 1} // Disable if it's the last item
        dataDescription={`Viewing: ${dataItems[currentDataId]}`}
      />
    </div>
  );
};

export default MyDataComponent;
```

### Key Use Cases:

- **Paginated Lists**: Ideal for navigating through lists of items where each data item needs to be displayed separately (e.g., a slideshow, report entries).
- **Detail View Navigation**: When viewing details of a specific data item, this component can help users move between items without returning to the main list.

This component offers a clean and intuitive way to navigate between items in a collection, improving user experience in any data-driven application.
