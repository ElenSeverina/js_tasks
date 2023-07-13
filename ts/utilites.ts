//!1
type Person1 = { name: string, age: number }
//Person1 - це об'єкт з обов'язковими полями name і age, утиліта Partial робить поля необов'язковими
type Person2 = Partial<Person1>
//утиліта має повернути об'єкт, в якого необов'язкові динамічні ключі, в Т потрапляє Person1
type MyPartial<T> = { [P in keyof T]?: T[P] }
type Person3 = MyPartial<Person1>

//!2
type Animal1 = { name?: string, weight?: number }
//утиліта Required протилежна - робить поля обов'язковими
type Animal2 = Required<Animal1>
//мінус перед знаком питання робить поля обов'язковими
type MyRequired<T> = { [P in keyof T]-?: T[P] }
type Animal3 = MyRequired<Animal1>

//!3
type Color1 = string | undefined | null
//NonNullable прибирає всі значення undefined і null
type Color2 = NonNullable<Color1>
//якщо Т розширюється від null або undefined, то нічого не повертаємо, а в інакшому випадку вертаємо тип
type MyNonNullable<T> = T extends null | undefined ? never : T
type Color3 = MyNonNullable<Color1>

//!4
type Dimenstions1 = { width: number, height: number, length: number }
//Record - першим аргументом вказуються ключі, а другим їх тип даних
type Dimenstions2 = Record<'width' | 'height' | 'length', number>
//в К ідуть параметри, Р in K - це три ключі і далі в Т тип ключів
type MyRecord<K extends keyof any, T> = {[P in K]: T}
type Dimenstions3 = MyRecord<'width' | 'height' | 'length', number>

//!5
type Article1 = { title: string, page: number }
const article1: Article1 = { title: 'Стаття', page: 1 }
//якщо без утиліти, то значення можна змінювати, помилки не буде
article1.title = 'Стаття 10'
//Readonly блокує зміну значень
type Article2 = Readonly<Article1>
//вказуємо readonly
type MyReadonly<T> = { readonly [P in keyof T]: T[P] }
type Article3 = MyReadonly<Article1>
//також можна зробити за допомогою приведення до константи
const article2 = { title: 'Стаття', page: 1 } as const

//!6
type Articles1 = Array<Article3>

const articles1: Articles1 = [
  { title: 'Стаття 1', page: 1 },
  { title: 'Стаття 2', page: 2 },
]
//якщо спробувати додати елемент, то помилки не буде
articles1.push( {title: 'Стаття 3', page: 3} )

//тепер масив захищений від змін, так само за допомогою константи
type Articles2 = ReadonlyArray<Article3>
const articles2: Articles2 = [
  { title: 'Стаття 1', page: 1 },
  { title: 'Стаття 2', page: 2 },
]
//буде помилка
articles2.push( {title: 'Стаття 3', page: 3} )

//!7
type Vector3 = { x: number, y: number, w: number }
//Pick - спочатку передаємо тип, а потім ті поля, які ми хочемо використати у новому об'єкті
type Vector2 = Pick<Vector3, 'x' | 'y'>
//в якості першого типу Т - Vector3, К - новий об'єкт, який розширяється від Vector3 і має ті ключі, які є в 
//першому типі, [P in K]: T[P] - створюємо динамічні ключі із потрібним нам типом
type MyPick<T, K extends keyof T> = { [P in K]: T[P] }
type Vector1 = MyPick<Vector3 , 'x'>

//!8
type A = string | number | boolean
type B = string | number
//Extract - візьме в С спільні значення, які є в А і в В
type C = Extract<A, B>
//тим Т розширюється типом U, і якщо це так, то повертається тип Т, інакше - нічого
//під Т передається string, під U також, вони співпадають, потім кожне значення порівнюється з кожним
type MyExtract<T, U> = T extends U ? T : never
type D = MyExtract<A, B>

//!9
//Exclude - поверне ті значення, які не співпадають
type E = Exclude<A, B>
type MyExclude<T, U> = T extends U ? never : T
type F = MyExclude<A, B>

//!10
type Person4 = { name: string, age: number, weight: number, height: number }
type Person5 = Omit<Person4, 'weight' | 'height'>
//Omit - видаляє значення, які передаються після основного типу
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
