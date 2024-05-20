import { PointerSensor } from '@dnd-kit/core';

/**
 * CustomPointerSensor class that extends the PointerSensor from DnD Kit.
 * It customizes the behavior to ignore clicks on elements with the class 'close-icon'.
 * 
 * @class
 * @extends PointerSensor
 */class CustomPointerSensor extends PointerSensor {
  static activators = [
    {
      eventName: 'onPointerDown',
      handler: ({ nativeEvent: event }) => {
        if (event.target.closest('.close-icon')) {
          return false;
        }
        return true;
      },
    },
  ];
}

export default CustomPointerSensor;