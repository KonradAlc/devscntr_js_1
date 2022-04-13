# Vanilla Javascript - zadanie 1

Realizacja prostej listy ToDo (lista zadań do zrobienia) jako aplikacji internetowej, z wykorzystaniem HTML, CSS (lub SCSS) oraz JS. 

## Funkcjonalność 
Aplikacja wyświetla listę zadań do wykonania. Zadania podzielone są na *wykonane* oraz *do zrobienia*. 
  - Zadania *wykonane* są przekreślone i są oznaczone kolorem (`#9eb2c0`) i zaznaczonym polem wyboru po lewej stronie.  
  - Zadania *do zrobienia* są oznaczone kolorem (`#2e3641`) i niezaznaczonym polem wyboru po lewej stronie. 
  - Pod listą zadań zawsze wyświetla się pole z możliwością dodania nowego zadania. Nowe zadanie jest zawsze *do zrobienia*
  - Po dodaniu nowego zadania, dodawane jest ono nad polem dodawana nowego zadania. Pole z możliwością dodania nowego zadania jest zawsze na samym dole listy. 
  - Nie można dodać zadania bez wpisania tytułu (trzeba dodać wizualną walidację).
  - Każde zadanie można usunąć poprzez kliknięcie w ikonę kosza.
  - W prawym górnym rogu dodajmy przycisk, który pozwola usunąć wszystkie taski.
  - **Uwaga!** Aktualny stan listy zapisany jest w <u>LocalStorage</u>.
  - Jeśli mamy zapisaną w LocalStorage liste, powinna się ona pojawić od razu po załadowaniu skryptu

### Opcjonalnie
  - można zmieniać kolejność zadań poprzez przenoszenie ich *drag & drop*
  - pojawiania się i znikanie elementów powinno być animowane.
  
## Wykonanie
Aplikacja ma przygotowany layout graficzny.

![Layout Aplikacji](https://raw.githubusercontent.com/qunabu/junior-recruitment-task/master/assets/to-do-list.png) 

  - Aplikacja ma być przygotowana jak `Single Page Application`, jeden plik HTML5 wraz z jednym głównym szablonem `CSS` i jednym plikiem `JavaScript`.  
  - Proszę o nie korzystanie z bibliotek JavaScriptowych lub użycie minimalnej ilości.
  - Font z którego należy korzystać to [Lato](https://www.google.com/fonts#UsePlace:use/Collection:Lato), autorstwa [Łukasza Dziedzica](http://www.lukaszdziedzic.eu/) w wersji Normal i Bold. Proszę o skorzystanie z wersji [Google Fonts](https://www.google.com/fonts#UsePlace:use/Collection:Lato).
  - [link do kony kosza](https://icons.getbootstrap.com/assets/icons/trash.svg)

  - repozytorium z wykonanym zadaniem proszę umieścić na swoim koncie GitHub.