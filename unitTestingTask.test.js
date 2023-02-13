const unitTestingTask = require("./unitTestingTask");

test('format argument is not a string', () => {
    const f = () => { unitTestingTask(99, new Date()) }
    expect(f).toThrow('Argument `format` must be a string');
})

test('date argument is not a date', () => {
    const f = () => { unitTestingTask('MM', true) }
    expect(f).toThrow('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
})

test('change language with no arguments', () => {
    expect(unitTestingTask.lang()).toBe('en')
})

test('change language with no options', () => {
    unitTestingTask.lang('pl', undefined);
    expect(unitTestingTask._languages.current).toBe('pl')
})

test('change language with options', () => {
    const options = {
        months: ['styczeń', 'luty']
    }

    unitTestingTask.lang('pl', options);

    expect(unitTestingTask._languages.pl.months[0]).toBe('styczeń');
})

test('register date format', () => {
    expect(unitTestingTask.register('ISODateTimeTZ', 'YYYY-MM-ddThh:mm:ssZ')(new Date('2023-2-13'))).toBe('2023-02-13T12:00:00+01:00')
})

test('unitTestingTask with format which already exists', () => {
    expect(unitTestingTask('ISODateTimeTZ', new Date('2023-2-13'))).toBe('2023-02-13T12:00:00+01:00')
})

test('unitTestingTask with format which not exist', () => {
    unitTestingTask.lang('pl');
    console.log(unitTestingTask._languages)
    console.log(unitTestingTask('DD-MM-YYYY', new Date()))
})