import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../../components/Task';
import { ITask } from '../../services/tasks.service'; 

describe('TaskItem component', () => {
  const mockTask: ITask = {
    _id: '1',
    title: 'Test Task',
    timestamp: ''
  };

  test('should render TaskItem with correct title', () => {
    const mockHandleEdit = jest.fn();
    const mockHandleDelete = jest.fn();

    render(
      <TaskItem
        task={mockTask}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />
    );

    expect(screen.getByText(mockTask.title)).toBeTruthy();

    expect(screen.getByText('✏️')).toBeTruthy();
    expect(screen.getByText('x')).toBeTruthy();
  });

  test('should call handleEdit when edit button is clicked', () => {
    const mockHandleEdit = jest.fn();
    const mockHandleDelete = jest.fn();

    render(
      <TaskItem
        task={mockTask}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />
    );

    const editButton = screen.getByText('✏️');
    fireEvent.click(editButton);

    expect(mockHandleEdit).toHaveBeenCalledWith(mockTask._id);
  });

  test('should call handleDelete when delete button is clicked', async () => {
    const mockHandleEdit = jest.fn();
    const mockHandleDelete = jest.fn();

    render(
      <TaskItem
        task={mockTask}
        handleEdit={mockHandleEdit}
        handleDelete={mockHandleDelete}
      />
    );

    const deleteButton = screen.getByText('x');
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledWith(mockTask._id);
  });
});
