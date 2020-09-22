# URL Query

## Feature
このモジュールではURL引数を扱う複数のメソッドを提供します。  

## Methods
### data

`urlQuery.data()` メソッドはURL引数を指定された型に変換して返却します。  

#### Samle URL
```
https://example.com?string=hoge&boolean=ture&number=000
```

```javascript
urlQuery.data(dataType["string" | "array" | "object"]);

/* =============================================

    dataType: string
    =>  string=hoge&boolean=ture&number=000
    dataType: array
    =>  ["string=hoge", "boolean=ture", "number=000"]
    dataType: object
    =>  {"string": "hoge", "boolean": ture, "number": "000"}
    dataType: other
    =>  error: urlQuery.data argument is not a valid value.

=============================================  */
```
#### 引数
`dataType` 引数は返却される値を指定します。  
`"string"` ではURL引数をそのまま文字列で返却  
`"array"` では各項目を配列として返却  
`"object"` では各プロパティをkeyとvalueに代入して返却します。  
また各引数は文字列で指定してください。  

### setCssVar
#### Samle URL
```
https://example.com?color=%23fff&fs=16px
```

*URL引数の中にハッシュ ( # ) を含める場合は必ずエスケープをした文字列 ( %20 ) を使用してください。*

`urlQuery.setCssVar()` メソッドは指定した要素で [CSS変数](https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_custom_properties) を宣言させます。  
`targetElement` 引数を省略した場合その変数は `:root` での宣言となります。  

```javascript
urlQuery.setCssVar(
    tagetProp([property_1,property_2 ...] || ["all"]),
    targetElement // option
);
```

```css
:root {
    --color: #fff;
    --fs: 16px;
}
```
#### 引数
`targetElement`  

`tagetProp`  
- Array => 指定されたプロパティのみを展開します。  
- \["all"\] => すべてのプロパティを展開します。  

*※allでの展開は便利ですが意図しない変数の宣言を行う可能性があるため原則的には配列で指定してください*