var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
              'August', 'September', 'October', 'November', 'December'];
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function Calender(month, year) {
    // reference: http://jszen.blogspot.com/2007/03/how-to-build-simple-calendar-with.html?_sm_au_=iFHrQN0DNVhSSRHh
    this.month = month;
    this.year = year;

    this.getHTML = function () {
        // Get the numeric value of the first day of the month
        var firstDay = new Date(this.year, this.month, 1);
        var startDay = firstDay.getDay();

        // Get the number of days in the month
        var monthLength = DAYS_IN_MONTH[this.month];

        // Account for leap year
        if(this.month == 1 && ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0)) {
            monthLength = 29
        }

        // Generate the HTML
        var html = '<table class="table" id="calender">';
        html += '<tr id="calender-header">' +
                '   <td colspan="2" id="prev-container"><button class="btn" id="prev-btn" onclick="prevBtn()">' +
                '       <span class="glyphicon glyphicon-menu-left"></span></button></td>' +
                '   <td colspan="3" id="calender-title">' + MONTHS[this.month] + "&nbsp;" + this.year + '</td>' +
                '   <td colspan="2" id="next-container"><button class="btn" id="next-btn" onclick="nextBtn()">' +
                '       <span class="glyphicon glyphicon-menu-right"></span></button></td></tr>';

        // Label for days of the week
        html += '<tr id="calender-day-label-container">';
        for(var i = 0; i <= 6; i++) {
            html += '<td class="calender-day-label">' + DAYS[i] + '</td>';
        }
        html += '</tr><tr class="calender-row">';

        // Cells of the calender
        var day = 1;
        for(i = 0; i < 9; i++) {
            for(var j = 0; j <= 6; j++) {
                if(day <= monthLength && (i > 0 || j >= startDay)) {
                    var id = this.month.toString()+ "-" + day.toString();
                    html += '<td class="calender-day" id="' + id + '" onclick="expandDay(this.id)"' +
                            ' onmouseenter="dayPreview(this.id)" onmouseleave="closePreview()">' +
                            '   <div class="row" id="event-notifier-' + id + '">' +
                            '       <div class="col-xs-1 cal-num">&nbsp;' + day + '</div>' +
                            '   </div>';
                    day++;
                } else {
                    html += '<td>'
                }
                html += '</td>'
            }
            if(day > monthLength) {
                break;
            }
            else {
                html += '</tr><tr class="calender-row">'
            }
        }
        html += '</table>';

        return html;
    }
}

function Event(event_id, event_date) {
    this.event_id = event_id;
    this.event_date = event_date;
    this.event_name;
    this.event_start;
    this.event_end;
    
    this.set_name = function (name) {
        this.event_name = name;
    };
    this.set_time = function (start, end) {
        this.event_start = start;
        this.event_end = end;
    };
    // Need this for testing
    this.toString = function () {
        var str = this.event_id.toString() + " " + this.event_date;
        if(this.event_name) { str += " " + this.event_name; }
        if(this.event_start) { str += " " + this.event_start; }
        if(this.event_end) { str += " " + this.event_end; }

        return str;
    }
}