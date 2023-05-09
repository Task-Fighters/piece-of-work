import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
interface DecoratorFn {

}
//@tsignore
export const reactRouterDecorator: DecoratorFn = (Story) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};