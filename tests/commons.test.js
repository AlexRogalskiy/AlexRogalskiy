// Official GitHub profile page
// Copyright (C) 2021 Alexander Rogalskiy
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see https\\://www.gnu.org/licenses/.
'use strict';

const expect = require('expect');

describe('my suite', () => {
  test.only('one of my .only test', () => {
    expect(1 + 1).toEqual(2);
  });
  test.only('other of my .only test', () => {
    expect(1 + 2).toEqual(3);
  });
  // Should fail, but isn't even run
  test('my only true test', () => {
    expect(1 + 1).toEqual(1);
  });
});
