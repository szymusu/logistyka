# Zadanie pośrednika

Pośrednik kupuje towar u 2 dostawców (D1, D2),
Podaż wynosi `20`, `30`
A koszty zakupu `10`, `12`

Towar ten przewozi i sprzedaje 3 odbiorcom (O1, O2, O3)
Popyt odbiorców `10`, `28`, `27`
Ceny sprzedaży `30`, `25`, `30`

Koszty transportu:
```
 8 | 14 | 17
12 |  9 | 19
```

Wyznacz plan dostaw maksymalizujący zyska całkowity pośrednika

## Krok 1
### Wyznaczenie zysku jednostkowego pośrednika

Zysk jednostkowy = Cena sprzedaży - Cena zakupu - Koszt transportu

```
12 |  1 |  3
 6 |  4 | -1
```

## Krok 2 
### Bilansowanie zagadnienia pośrednika

Całkowita podaż = `20 + 30 = 50`

Całkowity popyt = `10 + 28 + 27 = 65`

`50 != 65`

### Robimy se fikcyjnego odbiorce i dostawce

FO = całkowyta podaż = 50
FD = całkowity popyt = 65

115 = 115
### Zbilansowaned!

## Krok 3
### Wyznaczenie pierwszego planu transportu metodą maksymalnego elementu macierzy

### 1 iteracja
Dajemy max ile sie da tam gdzie nie najbardziej opłaca (duh)

## Krok 4
### Wyznaczenie zmiennych dualnych

Alfa i beta jot

Informuje nas o tym o ile zmieni sie zysk pośrednika, jeżeli dodamy trasy niebazowe

## Krok 5
### Wyznaczenie kryterialnych

`deltaj = Zj - Alfai - Betaj`
Informuje nas o tym, o ile zmieni sie zysk całkowity,
jeśli na danej trasie niebazowej, zaplanujemy transport 1 sztuki towaru

| O1 | O2 | O3 | OF |
|:--:|:--:|:--:|:--:|
| X  | -7 | X  | -3 |
| -2 | X  | X  | 1  |
| -9 | -5 | X  | X  |

Są wartości dodatnie `->` klops, nieoptymalne rozwiązanie

## Druga iteracja - musimy dokonać zmiany planu transportu

### Szukamy pętli prostokątnej, w której w każdej kolumnie lub w każdym wierszu liczba węzłów będie parzysta

Ten węzeł gdzie była liczba dodatnie - węzeł centralny

Pętla tylko z iksów

## Wynik

Zysk całkowity pośrednika
`12*10 + 3*10 + 4*28 = 262`

Przychód całkowity
`(10+0)*30 + (0+28)*25 + (10+0)*30 = 1300`

Koszt zakupu całkowity
`(10+0+10)*10 + (0+28+0)*12 = 536`

Koszt transportu całkowity
`8*10 + 14*0 + 17*10 + 12*0 + 9*28 + 19*0 = 502`

Zysk = Przychód - Zakup - Transport
`1300 - 502 - 536 = 262`

