# QualWeb CLI

## How to install

```shell
  $ npm i -g @qualweb/cli
```

## How to run

### Url input

#### Normal evaluation

```shell
  $ qw -u https://act-rules.github.io/pages/about/
```

#### Evaluation with EARL report

```shell
  $ qw -u https://act-rules.github.io/pages/about/ -r earl
```

### File input

If you want to evaluate multiple url's at once, you can input a file with each url separated by a newline **\n**.

#### Example

```shell
  $ qw -f urls.txt
```

#### Evaluation with EARL report

This method will create an EARL report for each url.

```shell
  $ qw -f urls.txt -r earl
```

This method will create an aggregated EARL report from all urls.

```shell
  $ qw -f urls.txt -r earl-a
```

## CLI options



# License

ISC