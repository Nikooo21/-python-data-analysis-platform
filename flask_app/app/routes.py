from flask import Blueprint, render_template, request, redirect, url_for
from .courses import get_all_courses, get_course_by_id, get_module_by_id, get_learning_resources, get_exercises, get_assessments, get_exercise_by_id, get_assessment_by_id
from .achievement import record_progress, get_user, get_user_badges

# 创建蓝图
main = Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/about')
def about():
    return render_template('about.html')


@main.route('/courses')
def courses():
    all_courses = get_all_courses()
    return render_template('courses.html', courses=all_courses)


@main.route('/courses/<int:course_id>')
def course_detail(course_id):
    course = get_course_by_id(course_id)
    if course:
        return render_template('course_detail.html', course=course)
    else:
        return render_template('error.html', message='课程不存在')


@main.route('/courses/<int:course_id>/modules/<int:module_id>')
def module_detail(course_id, module_id):
    course = get_course_by_id(course_id)
    module = get_module_by_id(course_id, module_id)
    if course and module:
        return render_template('module_detail.html', course=course, module=module)
    else:
        return render_template('error.html', message='模块不存在')


@main.route('/courses/<int:course_id>/modules/<int:module_id>/learning')
def learning_resources(course_id, module_id):
    course = get_course_by_id(course_id)
    module = get_module_by_id(course_id, module_id)
    resources = get_learning_resources(course_id, module_id)
    if course and module:
        return render_template('learning_resources.html', course=course, module=module, resources=resources)
    else:
        return render_template('error.html', message='模块不存在')


@main.route('/courses/<int:course_id>/modules/<int:module_id>/exercises')
def exercises_list(course_id, module_id):
    course = get_course_by_id(course_id)
    module = get_module_by_id(course_id, module_id)
    exercises = get_exercises(course_id, module_id)
    if course and module:
        return render_template('exercises_list.html', course=course, module=module, exercises=exercises)
    else:
        return render_template('error.html', message='模块不存在')


@main.route('/courses/<int:course_id>/modules/<int:module_id>/exercises/<int:exercise_id>')
def exercise_detail(course_id, module_id, exercise_id):
    course = get_course_by_id(course_id)
    module = get_module_by_id(course_id, module_id)
    exercise = get_exercise_by_id(course_id, module_id, exercise_id)
    if course and module and exercise:
        return render_template('exercise_detail.html', course=course, module=module, exercise=exercise)
    else:
        return render_template('error.html', message='练习不存在')


@main.route('/courses/<int:course_id>/modules/<int:module_id>/assessments')
def assessments_list(course_id, module_id):
    course = get_course_by_id(course_id)
    module = get_module_by_id(course_id, module_id)
    assessments = get_assessments(course_id, module_id)
    if course and module:
        return render_template('assessments_list.html', course=course, module=module, assessments=assessments)
    else:
        return render_template('error.html', message='模块不存在')


@main.route('/courses/<int:course_id>/modules/<int:module_id>/assessments/<int:assessment_id>')
def assessment_detail(course_id, module_id, assessment_id):
    course = get_course_by_id(course_id)
    module = get_module_by_id(course_id, module_id)
    assessment = get_assessment_by_id(course_id, module_id, assessment_id)
    if course and module and assessment:
        return render_template('assessment_detail.html', course=course, module=module, assessment=assessment)
    else:
        return render_template('error.html', message='测评不存在')


@main.route('/courses/<int:course_id>/modules/<int:module_id>/assessments/<int:assessment_id>/submit', methods=['POST'])
def submit_assessment(course_id, module_id, assessment_id):
    course = get_course_by_id(course_id)
    module = get_module_by_id(course_id, module_id)
    assessment = get_assessment_by_id(course_id, module_id, assessment_id)
    if course and module and assessment:
        user_answer = request.form.get('answer')
        if user_answer is not None:
            user_answer = int(user_answer)
            correct_answer = assessment['correct_answer']
            is_correct = user_answer == correct_answer
            
            # 记录学习进度并发放积分
            user_id = 1  # 假设当前用户ID为1
            record_progress(user_id, course_id, module_id, assessment_id, is_correct)
            
            # 获取用户信息和徽章
            user = get_user(user_id)
            badges = get_user_badges(user_id)
            
            return render_template('assessment_result.html', 
                                   course=course, 
                                   module=module, 
                                   assessment=assessment, 
                                   user_answer=user_answer, 
                                   correct_answer=correct_answer, 
                                   is_correct=is_correct,
                                   user=user,
                                   badges=badges)
        else:
            return render_template('error.html', message='请选择答案')
    else:
        return render_template('error.html', message='测评不存在')


@main.route('/leaderboard')
def leaderboard():
    from .achievement import get_leaderboard
    leaderboard_data = get_leaderboard()
    return render_template('leaderboard.html', leaderboard=leaderboard_data)


@main.route('/achievements')
def achievements():
    user_id = 1  # 假设当前用户ID为1
    from .achievement import get_user, get_user_badges, get_user_progress
    user = get_user(user_id)
    badges = get_user_badges(user_id)
    progress = get_user_progress(user_id)
    return render_template('achievements.html', user=user, badges=badges, progress=progress)