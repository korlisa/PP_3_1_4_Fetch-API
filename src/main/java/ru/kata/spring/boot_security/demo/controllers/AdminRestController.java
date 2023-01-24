package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.Collection;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {
    private UserService userService;
    private RoleService roleService;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    public void setRoleService(RoleService roleService) {
        this.roleService = roleService;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }

//    /***
//     * Подготовить объект User для сохранения в базу
//     */
//    @GetMapping("/newUser")
//    public String createForm(Model model, @ModelAttribute("user") User user) {
//        model.addAttribute("listOfRoles", roleService.getRoles());
//        return "create";
//    }

    /***
     * Сохранить в базу
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.createOrUpdate(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<Collection<Role>> getRoles() {
        return new ResponseEntity<>(roleService.getRoles(), HttpStatus.OK);
    }
    /***
     * Получить всех пользователей
     */
    @GetMapping
    public ResponseEntity<Collection<User>> getAllUsers() {
        final Collection<User> users = userService.getUsersList();
        return users != null && !users.isEmpty()
                ? new ResponseEntity<>(users, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /***
     * Получить одного пользователя
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(name="id") Long id) {
        return new ResponseEntity<>(userService.getUser(id), HttpStatus.OK);
    }
//    /***
//     * Подготовить изменения для объекта User
//     */
//    @GetMapping("/{id}/edit")
//    public String editForm(Model model, @PathVariable(name = "id") Long id) {
//        User user = userService.getUser(id);
//        model.addAttribute("user", user);
//        model.addAttribute("listRoles", roleService.getRoles());
//        return "edit";
//    }

    /***
     * Сохранить изменённого пользователя
     */
    @PutMapping()
    public ResponseEntity<String> editUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.createOrUpdate(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /***
     * Удалить пользователя
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteUser (@PathVariable(name="id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}