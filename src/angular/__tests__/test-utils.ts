import { type Type } from '@angular/core'
import { TestBed } from '@angular/core/testing'

export function createFixture<T>(component: Type<T>) {
  TestBed.resetTestingModule()
  TestBed.configureTestingModule({ imports: [component] })
  const fixture = TestBed.createComponent(component)
  fixture.detectChanges()
  return fixture
}

export function qs(el: Element, sel: string) {
  return el.querySelector(sel)
}

export function qsa(el: Element, sel: string) {
  return Array.from(el.querySelectorAll(sel))
}
